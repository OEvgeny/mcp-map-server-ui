import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult, Request } from "@modelcontextprotocol/sdk/types.js";
import type {
  AnySchema,
  SchemaOutput,
} from "@modelcontextprotocol/sdk/server/zod-compat.js";
import type { RequestOptions } from "@modelcontextprotocol/sdk/shared/protocol.js";
import { z } from "zod/v4";
import { ToolListChangedNotificationSchema } from "@modelcontextprotocol/sdk/types.js";

const DEFAULT_INPUT_SCHEMA: ToolInputSchema = {
  type: "object",
  properties: {},
  required: [],
};

type ToolInputSchema = {
  type: "object";
  properties: Record<string, unknown>;
  required: string[];
};

type ModelContextTool = {
  name: string;
  description?: string;
  inputSchema: ToolInputSchema;
  annotations?: Record<string, unknown>;
  execute: (params: Record<string, unknown>, client: unknown) => Promise<unknown>;
};

type RegisteredTool = {
  description?: string;
  inputSchema?: unknown;
  annotations?: Record<string, unknown>;
  enabled?: boolean;
  handler: (
    args: Record<string, unknown>,
    ctx: { signal?: AbortSignal },
  ) => Promise<CallToolResult>;
};

type RegisterOptions = {
  filter?: (name: string, tool: RegisteredTool) => boolean;
  resourceFilter?: (uri: string, resource: RegisteredResource) => boolean;
  resourceTemplateFilter?: (
    uriTemplate: string,
    resource: RegisteredResourceTemplate,
  ) => boolean;
  refreshOnToolsChanged?: boolean;
  returnFullResult?: boolean;
};

type RegisteredResource = {
  name?: string;
  title?: string;
  metadata?: {
    description?: string;
    mimeType?: string;
  };
  enabled?: boolean;
  readCallback: (
    uri: unknown,
    params?: Record<string, unknown>,
    ctx?: { signal?: AbortSignal },
  ) => Promise<unknown>;
};

type RegisteredResourceTemplate = {
  name?: string;
  title?: string;
  metadata?: {
    description?: string;
    mimeType?: string;
  };
  enabled?: boolean;
  readCallback: (
    uri: unknown,
    params?: Record<string, unknown>,
    ctx?: { signal?: AbortSignal },
  ) => Promise<unknown>;
};

type ModelContextResource = {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
  read: (
    uri: URL,
    params?: Record<string, unknown>,
    client?: unknown,
  ) => Promise<unknown>;
};

export type McpClientLike = {
  listTools: () => ModelContextTool[];
  listResources: () => ModelContextResource[];
  listResourceTemplates: () => ModelContextResource[];
  executeTool: (
    name: string,
    params: Record<string, unknown>,
    options?: { signal?: AbortSignal },
  ) => Promise<unknown>;
  readResource: (
    uri: string,
    options?: { signal?: AbortSignal },
  ) => Promise<unknown>;
  /**
   * Sends a request and waits for a response.
   *
   * Do not use this method to emit notifications! Use notification() instead.
   */
  request: <T extends AnySchema>(
    request: Request,
    resultSchema: T,
    options?: RequestOptions,
  ) => Promise<SchemaOutput<T>>;
};

function normalizeToolInputSchema(schema: unknown): ToolInputSchema {
  if (!schema || typeof schema !== "object") {
    return {
      type: "object",
      properties: {},
      required: [],
    };
  }

  const value = schema as Partial<ToolInputSchema>;
  return {
    type: value.type === "object" ? "object" : "object",
    properties: value.properties ?? {},
    required: Array.isArray(value.required) ? value.required : [],
  };
}

async function resolveSchemaToJson(
  schema: any,
): Promise<ToolInputSchema | null> {
  return normalizeToolInputSchema(z.toJSONSchema(schema, { io: "input" }));
}

async function buildListToolsSchemaMap(
  server: McpServer,
): Promise<Map<string, ToolInputSchema>> {
  const schemaMap = new Map<string, ToolInputSchema>();
  const protocolServer = (server as { server?: any }).server;

  if (!protocolServer?.listTools) {
    return schemaMap;
  }

  const result = await protocolServer.listTools();
  const tools = Array.isArray(result?.tools) ? result.tools : [];

  for (const tool of tools) {
    if (!tool?.name) continue;
    schemaMap.set(tool.name, normalizeToolInputSchema(tool.inputSchema));
  }

  return schemaMap;
}

async function convertRegisteredTools(
  server: McpServer,
  options: RegisterOptions,
): Promise<ModelContextTool[]> {
  const registeredTools =
    (server as unknown as { _registeredTools?: Record<string, RegisteredTool> })
      ._registeredTools ?? {};

  const listToolsSchemas = await buildListToolsSchemaMap(server);

  const entries = Object.entries(registeredTools);
  const converted: ModelContextTool[] = [];

  for (const [name, tool] of entries) {
    if (tool.enabled === false) continue;
    if (options.filter && !options.filter(name, tool)) continue;

    let inputSchema = await resolveSchemaToJson(tool.inputSchema);
    if (!inputSchema && listToolsSchemas.has(name)) {
      inputSchema = listToolsSchemas.get(name) ?? null;
    }

    const toolInputSchema = inputSchema ?? { ...DEFAULT_INPUT_SCHEMA };

    converted.push({
      name,
      description: tool.description,
      inputSchema: toolInputSchema,
      annotations: tool.annotations,
      execute: async (params, client) => {
        const signal = (client as { signal?: AbortSignal })?.signal;
        const ctx = signal ? { signal } : {};
        const result = await tool.handler(params, ctx);

        if (result?.isError) {
          const textContent = result.content
            ?.map((block) => (block?.type === "text" ? block.text : ""))
            .filter(Boolean)
            .join("\n");
          throw new Error(textContent || "Tool execution failed");
        }

        return options.returnFullResult ? result : result.content;
      },
    });
  }

  return converted;
}

async function convertRegisteredResources(
  server: McpServer,
  options: RegisterOptions,
): Promise<ModelContextResource[]> {
  const registeredResources =
    (server as unknown as { _registeredResources?: Record<string, RegisteredResource> })
      ._registeredResources ?? {};

  const converted: ModelContextResource[] = [];

  for (const [uri, resource] of Object.entries(registeredResources)) {
    if (resource.enabled === false) continue;
    if (options.resourceFilter && !options.resourceFilter(uri, resource)) {
      continue;
    }

    const name = resource.title || resource.name || uri;
    const description = resource.metadata?.description;
    const mimeType = resource.metadata?.mimeType;

    converted.push({
      uri,
      name,
      description,
      mimeType,
      read: async (resourceUri, params, client) => {
        const signal = (client as { signal?: AbortSignal })?.signal;
        const ctx = signal ? { signal } : {};
        return resource.readCallback(resourceUri, params, ctx);
      },
    });
  }

  return converted;
}

async function convertRegisteredResourceTemplates(
  server: McpServer,
  options: RegisterOptions,
): Promise<ModelContextResource[]> {
  const registeredTemplates =
    (
      server as unknown as {
        _registeredResourceTemplates?: Record<string, RegisteredResourceTemplate>;
      }
    )._registeredResourceTemplates ?? {};

  const converted: ModelContextResource[] = [];

  for (const [uriTemplate, resource] of Object.entries(registeredTemplates)) {
    if (resource.enabled === false) continue;
    if (
      options.resourceTemplateFilter &&
      !options.resourceTemplateFilter(uriTemplate, resource)
    ) {
      continue;
    }

    const name = resource.title || resource.name || uriTemplate;
    const description = resource.metadata?.description;
    const mimeType = resource.metadata?.mimeType;

    converted.push({
      uri: uriTemplate,
      name,
      description,
      mimeType,
      read: async (resourceUri, params, client) => {
        const signal = (client as { signal?: AbortSignal })?.signal;
        const ctx = signal ? { signal } : {};
        return resource.readCallback(resourceUri, params, ctx);
      },
    });
  }

  return converted;
}

function getModelContext(): any {
  if (typeof navigator === "undefined") {
    throw new Error("navigator is not available in this environment");
  }

  const modelContext = (navigator as { modelContext?: any }).modelContext;
  if (!modelContext) {
    throw new Error("navigator.modelContext is not available");
  }

  return modelContext;
}

async function provideModelContextTools(tools: ModelContextTool[]): Promise<void> {
  const modelContext = getModelContext();

  if (typeof modelContext.provideContext === "function") {
    await modelContext.provideContext({ tools });
    return;
  }

  if (typeof modelContext.registerTool === "function") {
    for (const tool of tools) {
      await modelContext.registerTool(tool);
    }
    return;
  }

  throw new Error("No tool registration method found on navigator.modelContext");
}

async function provideModelContextResources(
  resources: ModelContextResource[],
): Promise<void> {
  const modelContext = getModelContext();

  if (typeof modelContext.registerResource !== "function") {
    throw new Error(
      "navigator.modelContext.registerResource is not available",
    );
  }

  for (const resource of resources) {
    await modelContext.registerResource(resource);
  }
}

function createClientLike(
  tools: ModelContextTool[],
  resources: ModelContextResource[],
  templates: ModelContextResource[],
): McpClientLike {
  return {
    listTools: () => {
      const modelContext = getModelContext();
      if (typeof modelContext.listTools === "function") {
        return modelContext.listTools();
      }
      return tools;
    },
    listResources: () => {
      const modelContext = getModelContext();
      if (typeof modelContext.listResources === "function") {
        return modelContext.listResources();
      }
      return resources;
    },
    listResourceTemplates: () => {
      const modelContext = getModelContext();
      if (typeof modelContext.listResourceTemplates === "function") {
        return modelContext.listResourceTemplates();
      }
      return templates;
    },
    executeTool: async (name, params, options) => {
      const modelContext = getModelContext();
      if (typeof modelContext.executeTool === "function") {
        return modelContext.executeTool(name, params, options);
      }

      const tool = tools.find((entry) => entry.name === name);
      if (!tool) {
        throw new Error(`Tool not found: ${name}`);
      }

      return tool.execute(params, options);
    },
    readResource: async (uri, options) => {
      const modelContext = getModelContext();
      if (typeof modelContext.readResource === "function") {
        return modelContext.readResource(uri, options);
      }

      const resource = resources.find((entry) => entry.uri === uri);
      if (!resource) {
        throw new Error(`Resource not found: ${uri}`);
      }

      return resource.read(new URL(uri), undefined, options);
    },
    request: async (request, resultSchema, options) => {
      const modelContext = getModelContext();
      if (typeof modelContext.request === "function") {
        return modelContext.request(request, resultSchema, options);
      }

      if (request.method === "tools/call") {
        const params = (request as { params?: Record<string, unknown> }).params ?? {};
        const name = params.name;
        const args =
          (params as { arguments?: Record<string, unknown> }).arguments ?? {};

        if (typeof name !== "string" || !name) {
          throw new Error("tools/call request missing tool name");
        }

        const result = typeof modelContext.executeTool === "function"
          ? await modelContext.executeTool(name, args, options)
          : await (() => {
              const tool = tools.find((entry) => entry.name === name);
              if (!tool) {
                throw new Error(`Tool not found: ${name}`);
              }
              return tool.execute(args, options);
            })();

        if (typeof (resultSchema as { parse?: (value: unknown) => unknown }).parse === "function") {
          return (resultSchema as { parse: (value: unknown) => SchemaOutput<typeof resultSchema> })
            .parse(result) as SchemaOutput<typeof resultSchema>;
        }

        return result as SchemaOutput<typeof resultSchema>;
      }

      if (request.method === "resources/read") {
        const params = (request as { params?: Record<string, unknown> }).params ?? {};
        const uri = params.uri;

        if (typeof uri !== "string" || !uri) {
          throw new Error("resources/read request missing uri");
        }

        const result = typeof modelContext.readResource === "function"
          ? await modelContext.readResource(uri, options)
          : await (() => {
              const resource = resources.find((entry) => entry.uri === uri);
              if (!resource) {
                throw new Error(`Resource not found: ${uri}`);
              }
              return resource.read(new URL(uri), undefined, options);
            })();

        if (typeof (resultSchema as { parse?: (value: unknown) => unknown }).parse === "function") {
          return (resultSchema as { parse: (value: unknown) => SchemaOutput<typeof resultSchema> })
            .parse(result) as SchemaOutput<typeof resultSchema>;
        }

        return result as SchemaOutput<typeof resultSchema>;
      }

      throw new Error(`Unsupported request method: ${request.method}`);
    },
  };
}

function tryRegisterToolsChangedListener(
  server: McpServer,
  refresh: () => Promise<void>,
  enabled: boolean,
): void {
  if (!enabled) return;

  const protocolServer = (server as { server?: any }).server;

  try {
    protocolServer.setNotificationHandler(ToolListChangedNotificationSchema, refresh);
  } catch {
    // Ignore if handler registration fails.
  }
}

export async function registerMcpServerToolsAsPageTools(
  server: McpServer,
  options: RegisterOptions = {},
): Promise<void> {
  const refreshOnToolsChanged = options.refreshOnToolsChanged ?? true;

  const refresh = async () => {
    const tools = await convertRegisteredTools(server, options);
    await provideModelContextTools(tools);
  };

  await refresh();
  tryRegisterToolsChangedListener(server, refresh, refreshOnToolsChanged);
}

export async function registerMcpServerResourcesAsPageResources(
  server: McpServer,
  options: RegisterOptions = {},
): Promise<McpClientLike> {
  const [resources, templates, tools] = await Promise.all([
    convertRegisteredResources(server, options),
    convertRegisteredResourceTemplates(server, options),
    convertRegisteredTools(server, options),
  ]);
  await provideModelContextResources([...resources, ...templates]);
  return createClientLike(tools, resources, templates);
}

export async function registerMcpServerAsPageContext(
  server: McpServer,
  options: RegisterOptions = {},
): Promise<McpClientLike> {
  const refreshOnToolsChanged = options.refreshOnToolsChanged ?? true;

  const [resources, templates, tools] = await Promise.all([
    convertRegisteredResources(server, options),
    convertRegisteredResourceTemplates(server, options),
    convertRegisteredTools(server, options),
  ]);

  await provideModelContextResources([...resources, ...templates]);
  await provideModelContextTools(tools);

  if (refreshOnToolsChanged) {
    const refresh = async () => {
      const refreshedTools = await convertRegisteredTools(server, options);
      await provideModelContextTools(refreshedTools);
    };

    tryRegisterToolsChangedListener(server, refresh, true);
  }

  return createClientLike(tools, resources, templates);
}
