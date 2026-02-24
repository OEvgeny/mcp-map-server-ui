import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
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
  const registeredTemplates =
    (
      server as unknown as {
        _registeredResourceTemplates?: Record<string, RegisteredResourceTemplate>;
      }
    )._registeredResourceTemplates ?? {};

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
): Promise<void> {
  const resources = await convertRegisteredResources(server, options);
  await provideModelContextResources(resources);
}
