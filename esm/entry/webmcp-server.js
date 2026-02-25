import * as z3rt from "zod/v3";
import * as z4mini from "zod/v4-mini";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListToolsRequestSchema,
  PolyfillJsonSchemaValidator,
  mergeCapabilities,
} from "@mcp-b/webmcp-ts-sdk";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createServer as createMCPServer } from 'out-root/server.js';

const DEFAULT_INPUT_SCHEMA = {
  type: "object",
  properties: {}
};

function isZ4Schema(schema) {
  return !!schema?._zod;
}

function objectFromShape(shape) {
  const values = Object.values(shape);
  if (values.length === 0) return z4mini.object({});
  const allV4 = values.every(isZ4Schema);
  const allV3 = values.every((s) => !isZ4Schema(s));
  if (allV4) return z4mini.object(shape);
  if (allV3) return z3rt.object(shape);
  throw new Error("Mixed Zod versions detected in object shape.");
}

async function safeParseAsync(schema, data) {
  if (isZ4Schema(schema)) return await z4mini.safeParseAsync(schema, data);
  return await schema.safeParseAsync(data);
}

function normalizeObjectSchema(schema) {
  if (!schema) return undefined;
  if (typeof schema === "object") {
    const asV3 = schema;
    const asV4 = schema;
    if (!asV3._def && !asV4._zod) {
      const values = Object.values(schema);
      if (
        values.length > 0 &&
        values.every(
          (value) =>
            typeof value === "object" &&
            value !== null &&
            (value._def !== undefined ||
              value._zod !== undefined ||
              typeof value.parse === "function")
        )
      ) {
        return objectFromShape(schema);
      }
    }
  }
  if (isZ4Schema(schema)) {
    const def = schema._zod?.def;
    if (def && (def.type === "object" || def.shape !== undefined)) return schema;
  } else if (schema.shape !== undefined) {
    return schema;
  }
  return undefined;
}

function getParseErrorMessage(error) {
  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") return error.message;
    if ("issues" in error && Array.isArray(error.issues) && error.issues.length > 0) {
      const firstIssue = error.issues[0];
      if (firstIssue && typeof firstIssue === "object" && "message" in firstIssue) {
        return String(firstIssue.message);
      }
    }
    try {
      return JSON.stringify(error);
    } catch {
      return String(error);
    }
  }
  return String(error);
}

function mapMiniTarget(target) {
  if (!target) return "draft-7";
  if (target === "jsonSchema7" || target === "draft-7") return "draft-7";
  if (target === "jsonSchema2019-09" || target === "draft-2020-12") {
    return "draft-2020-12";
  }
  return "draft-7";
}

function toJsonSchemaCompat(schema, opts) {
  if (isZ4Schema(schema)) {
    return z4mini.toJSONSchema(schema, {
      target: mapMiniTarget(opts?.target),
      io: opts?.pipeStrategy ?? "input",
    });
  }
  return zodToJsonSchema(schema, {
    strictUnions: opts?.strictUnions ?? true,
    pipeStrategy: opts?.pipeStrategy ?? "input",
  });
}

const DEFAULT_CLIENT_REQUEST_TIMEOUT = 10000;

function withDefaultTimeout(options) {
  if (options?.signal) return options;
  return {
    ...options,
    signal: AbortSignal.timeout(DEFAULT_CLIENT_REQUEST_TIMEOUT),
  };
}

class BrowserMcpServer extends McpServer {
  native;
  _promptSchemas = new Map();
  _jsonValidator;
  _publicMethodsBound = false;

  constructor(serverInfo, options) {
    const validator = new PolyfillJsonSchemaValidator();
    const enhancedOptions = {
      capabilities: mergeCapabilities(options?.capabilities || {}, {
        tools: { listChanged: true },
        resources: { listChanged: true },
        prompts: { listChanged: true },
      }),
      jsonSchemaValidator: options?.jsonSchemaValidator ?? validator,
    };
    super(serverInfo, enhancedOptions);
    this._jsonValidator = validator;
    this.native = options?.native;
    this.bindPublicApiMethods();
  }

  bindPublicApiMethods() {
    if (this._publicMethodsBound) return;
    this.registerTool = this.registerTool.bind(this);
    this.unregisterTool = this.unregisterTool.bind(this);
    this.provideContext = this.provideContext.bind(this);
    this.clearContext = this.clearContext.bind(this);
    this.listTools = this.listTools.bind(this);
    this.callTool = this.callTool.bind(this);
    this.executeTool = this.executeTool.bind(this);
    this.registerResource = this.registerResource.bind(this);
    this.listResources = this.listResources.bind(this);
    this.readResource = this.readResource.bind(this);
    this.registerPrompt = this.registerPrompt.bind(this);
    this.listPrompts = this.listPrompts.bind(this);
    this.getPrompt = this.getPrompt.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.elicitInput = this.elicitInput.bind(this);
    this._publicMethodsBound = true;
  }

  get _parentTools() {
    return this._registeredTools;
  }

  get _parentResources() {
    return this._registeredResources;
  }

  get _parentPrompts() {
    return this._registeredPrompts;
  }

  toTransportSchema(schema) {
    if (!schema || typeof schema !== "object") return DEFAULT_INPUT_SCHEMA;
    const normalized = normalizeObjectSchema(schema);
    if (normalized) {
      return toJsonSchemaCompat(normalized, {
        strictUnions: true,
        pipeStrategy: "input",
      });
    }
    return schema;
  }

  isZodSchema(schema) {
    if (!schema || typeof schema !== "object") return false;
    return "_zod" in schema || "_def" in schema;
  }

  getNativeToolsApi() {
    if (!this.native) return undefined;
    const candidate = this.native;
    if (
      typeof candidate.listTools !== "function" ||
      typeof candidate.callTool !== "function"
    ) {
      return undefined;
    }
    return candidate;
  }

  registerToolInServer(tool) {
    const inputSchema = tool.inputSchema ?? DEFAULT_INPUT_SCHEMA;
    super.registerTool(
      tool.name,
      {
        description: tool.description,
        inputSchema,
        ...(tool._meta ? { _meta: tool._meta } : {}),
        ...(tool.outputSchema ? { outputSchema: tool.outputSchema } : {}),
        ...(tool.annotations ? { annotations: tool.annotations } : {}),
      },
      async (args) => {
        return tool.execute(args, { requestUserInteraction: async (cb) => cb() });
      }
    );
    return { unregister: () => this.unregisterTool(tool.name) };
  }

  backfillTools(tools, execute) {
    let synced = 0;
    for (const sourceTool of tools) {
      if (!sourceTool?.name || this._parentTools[sourceTool.name]) continue;
      const toolDescriptor = {
        name: sourceTool.name,
        description: sourceTool.description ?? "",
        inputSchema: sourceTool.inputSchema ?? DEFAULT_INPUT_SCHEMA,
        execute: async (args) => execute(sourceTool.name, args),
      };
      if (sourceTool.outputSchema) toolDescriptor.outputSchema = sourceTool.outputSchema;
      if (sourceTool.annotations) toolDescriptor.annotations = sourceTool.annotations;
      this.registerToolInServer(toolDescriptor);
      synced++;
    }
    return synced;
  }

  registerTool(tool) {
    if (this.native) this.native.registerTool(tool);
    try {
      return this.registerToolInServer(tool);
    } catch (error) {
      if (this.native) {
        try {
          this.native.unregisterTool(tool.name);
        } catch (rollbackError) {
          console.error(
            "[BrowserMcpServer] Rollback of native tool registration failed:",
            rollbackError
          );
        }
      }
      throw error;
    }
  }

  syncNativeTools() {
    const nativeToolsApi = this.getNativeToolsApi();
    if (!nativeToolsApi) return 0;
    const nativeCallTool = nativeToolsApi.callTool.bind(nativeToolsApi);
    return this.backfillTools(nativeToolsApi.listTools(), async (name, args) =>
      nativeCallTool({ name, arguments: args })
    );
  }

  unregisterTool(name) {
    this._parentTools[name]?.remove();
    if (this.native) this.native.unregisterTool(name);
  }

  registerResource(descriptor) {
    const registered = super.registerResource(
      descriptor.name,
      descriptor.uri,
      {
        ...(descriptor.description !== undefined
          ? { description: descriptor.description }
          : {}),
        ...(descriptor.mimeType !== undefined ? { mimeType: descriptor.mimeType } : {}),
      },
      async (uri) => ({ contents: (await descriptor.read(uri)).contents })
    );
    return { unregister: () => registered.remove() };
  }

  registerPrompt(descriptor) {
    if (descriptor.argsSchema) this._promptSchemas.set(descriptor.name, descriptor.argsSchema);
    const registered = super.registerPrompt(
      descriptor.name,
      {
        ...(descriptor.description !== undefined
          ? { description: descriptor.description }
          : {}),
      },
      async (args) => ({ messages: (await descriptor.get(args)).messages })
    );
    return {
      unregister: () => {
        this._promptSchemas.delete(descriptor.name);
        registered.remove();
      },
    };
  }

  provideContext(options) {
    for (const tool of Object.values(this._parentTools)) tool.remove();
    if (this.native) this.native.clearContext();
    for (const tool of options?.tools ?? []) this.registerTool(tool);
  }

  clearContext() {
    for (const tool of Object.values(this._parentTools)) tool.remove();
    if (this.native) this.native.clearContext();
  }

  listResources() {
    return Object.entries(this._parentResources)
      .filter(([, resource]) => resource.enabled)
      .map(([uri, resource]) => ({
        uri,
        name: resource.name,
        ...resource.metadata,
      }));
  }

  async readResource(uri) {
    const resource = this._parentResources[uri];
    if (!resource) throw new Error(`Resource not found: ${uri}`);
    return resource.readCallback(new URL(uri), {});
  }

  listPrompts() {
    return Object.entries(this._parentPrompts)
      .filter(([, prompt]) => prompt.enabled)
      .map(([name, prompt]) => {
        const schema = this._promptSchemas.get(name);
        return {
          name,
          ...(prompt.description !== undefined ? { description: prompt.description } : {}),
          ...(schema?.properties
            ? {
                arguments: Object.entries(schema.properties).map(([argName, prop]) => ({
                  name: argName,
                  ...(typeof prop === "object" &&
                  prop !== null &&
                  "description" in prop
                    ? { description: prop.description }
                    : {}),
                  ...(schema.required?.includes(argName) ? { required: true } : {}),
                })),
              }
            : {}),
        };
      });
  }

  async getPrompt(name, args = {}) {
    const prompt = this._parentPrompts[name];
    if (!prompt) throw new Error(`Prompt not found: ${name}`);
    const schema = this._promptSchemas.get(name);
    if (schema) {
      const result = this._jsonValidator.getValidator(schema)(args);
      if (!result.valid) {
        throw new Error(`Invalid arguments for prompt ${name}: ${result.errorMessage}`);
      }
    }
    return prompt.callback(args, {});
  }

  listTools() {
    return Object.entries(this._parentTools)
      .filter(([, tool]) => tool.enabled)
      .map(([name, tool]) => {
        const item = {
          name,
          description: tool.description ?? "",
          inputSchema: this.toTransportSchema(tool.inputSchema ?? DEFAULT_INPUT_SCHEMA),
          _meta: tool._meta,
        };
        if (tool.outputSchema) item.outputSchema = this.toTransportSchema(tool.outputSchema);
        if (tool.annotations) item.annotations = tool.annotations;
        return item;
      });
  }

  async validateToolInput(tool, args, toolName) {
    if (!tool.inputSchema) return undefined;
    if (this.isZodSchema(tool.inputSchema)) {
      const result = await safeParseAsync(tool.inputSchema, args ?? {});
      if (!result.success) {
        throw new Error(
          `Invalid arguments for tool ${toolName}: ${getParseErrorMessage(result.error)}`
        );
      }
      return result.data;
    }
    const result = this._jsonValidator.getValidator(tool.inputSchema)(args ?? {});
    if (!result.valid) {
      throw new Error(`Invalid arguments for tool ${toolName}: ${result.errorMessage}`);
    }
    return result.data;
  }

  async validateToolOutput(tool, result, toolName) {
    if (!tool.outputSchema) return;
    const response = result;
    if (!("content" in response) || response.isError || !response.structuredContent) return;
    if (this.isZodSchema(tool.outputSchema)) {
      const parseResult = await safeParseAsync(tool.outputSchema, response.structuredContent);
      if (!parseResult.success) {
        throw new Error(
          `Output validation error: Invalid structured content for tool ${toolName}: ${getParseErrorMessage(parseResult.error)}`
        );
      }
      return;
    }
    const validationResult = this._jsonValidator.getValidator(tool.outputSchema)(
      response.structuredContent
    );
    if (!validationResult.valid) {
      throw new Error(
        `Output validation error: Invalid structured content for tool ${toolName}: ${validationResult.errorMessage}`
      );
    }
  }

  async callTool(params) {
    const tool = this._parentTools[params.name];
    if (!tool) throw new Error(`Tool not found: ${params.name}`);
    return tool.handler(params.arguments ?? {}, {});
  }

  async executeTool(name, args = {}) {
    return this.callTool({
      name,
      arguments: args,
    });
  }

  async connect(transport) {
    this.setToolRequestHandlers();
    this.setResourceRequestHandlers();
    this.setPromptRequestHandlers();
    this.server.setRequestHandler(ListToolsRequestSchema, () => ({ tools: this.listTools() }));
    this.server.setRequestHandler(ListPromptsRequestSchema, () => ({ prompts: this.listPrompts() }));
    this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
      const prompt = this._parentPrompts[request.params.name];
      if (!prompt) throw new Error(`Prompt ${request.params.name} not found`);
      if (!prompt.enabled) throw new Error(`Prompt ${request.params.name} disabled`);
      const schema = this._promptSchemas.get(request.params.name);
      if (schema) {
        const result = this._jsonValidator.getValidator(schema)(request.params.arguments ?? {});
        if (!result.valid) {
          throw new Error(
            `Invalid arguments for prompt ${request.params.name}: ${result.errorMessage}`
          );
        }
        return prompt.callback(request.params.arguments, {});
      }
      return prompt.callback({}, {});
    });
    return super.connect(transport);
  }

  async createMessage(params, options) {
    return this.server.createMessage(params, withDefaultTimeout(options));
  }

  async elicitInput(params, options) {
    return this.server.elicitInput(params, withDefaultTimeout(options));
  }
}

class WebMCPServer extends BrowserMcpServer {
  constructor(config, options) {
    super(config, {
      ...options,
      native: navigator.modelContext
    });

    this.webRegisterTool = this.registerTool;
    this.registerTool = async (name, config, execute) => this.webRegisterTool({
      name,
      execute,
      ...config,
    });

    this.webRegisterResource = this.registerResource;
    this.registerResource = async (name, uri, config, read) => {
      if (this.native?.registerResource instanceof Function) {
        this.native.registerResource({
          name,
          uri,
          read,
          ...config,
        });
      }
      return this.webRegisterResource({
        name,
        uri,
        read,
        ...config,
      });
    };

    this.webRegisterPrompt = this.registerPrompt;
    this.registerPrompt = async (config, get) => {
      if (this.native?.registerPrompt instanceof Function) {
        this.native.registerPrompt({
          get,
          ...config,
        });
      }
      return this.webRegisterPrompt({
        get,
        ...config,
      });
    }
  }
}

export function createServer() {
  const server = createMCPServer(WebMCPServer);
  return server;
}
