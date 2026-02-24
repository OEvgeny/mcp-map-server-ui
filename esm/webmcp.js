// entry/webmcp.ts
import { z } from "./zod.js";
import { ToolListChangedNotificationSchema } from "./mcp.js";
var DEFAULT_INPUT_SCHEMA = {
  type: "object",
  properties: {},
  required: []
};
function normalizeToolInputSchema(schema) {
  if (!schema || typeof schema !== "object") {
    return {
      type: "object",
      properties: {},
      required: []
    };
  }
  const value = schema;
  return {
    type: value.type === "object" ? "object" : "object",
    properties: value.properties ?? {},
    required: Array.isArray(value.required) ? value.required : []
  };
}
async function resolveSchemaToJson(schema) {
  return normalizeToolInputSchema(z.toJSONSchema(schema, { io: "input" }));
}
async function buildListToolsSchemaMap(server) {
  const schemaMap = /* @__PURE__ */ new Map();
  const protocolServer = server.server;
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
async function convertRegisteredTools(server, options) {
  const registeredTools = server._registeredTools ?? {};
  const listToolsSchemas = await buildListToolsSchemaMap(server);
  const entries = Object.entries(registeredTools);
  const converted = [];
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
        const signal = client?.signal;
        const ctx = signal ? { signal } : {};
        const result = await tool.handler(params, ctx);
        if (result?.isError) {
          const textContent = result.content?.map((block) => block?.type === "text" ? block.text : "").filter(Boolean).join("\n");
          throw new Error(textContent || "Tool execution failed");
        }
        return options.returnFullResult ? result : result.content;
      }
    });
  }
  return converted;
}
async function convertRegisteredResources(server, options) {
  const registeredResources = server._registeredResources ?? {};
  const converted = [];
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
        const signal = client?.signal;
        const ctx = signal ? { signal } : {};
        return resource.readCallback(resourceUri, params, ctx);
      }
    });
  }
  return converted;
}
async function convertRegisteredResourceTemplates(server, options) {
  const registeredTemplates = server._registeredResourceTemplates ?? {};
  const converted = [];
  for (const [uriTemplate, resource] of Object.entries(registeredTemplates)) {
    if (resource.enabled === false) continue;
    if (options.resourceTemplateFilter && !options.resourceTemplateFilter(uriTemplate, resource)) {
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
        const signal = client?.signal;
        const ctx = signal ? { signal } : {};
        return resource.readCallback(resourceUri, params, ctx);
      }
    });
  }
  return converted;
}
function getModelContext() {
  if (typeof navigator === "undefined") {
    throw new Error("navigator is not available in this environment");
  }
  const modelContext = navigator.modelContext;
  if (!modelContext) {
    throw new Error("navigator.modelContext is not available");
  }
  return modelContext;
}
async function provideModelContextTools(tools) {
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
async function provideModelContextResources(resources) {
  const modelContext = getModelContext();
  if (typeof modelContext.registerResource !== "function") {
    throw new Error(
      "navigator.modelContext.registerResource is not available"
    );
  }
  for (const resource of resources) {
    await modelContext.registerResource(resource);
  }
}
function createClientLike(tools, resources, templates) {
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
      return resource.read(new URL(uri), void 0, options);
    },
    request: async (request, resultSchema, options) => {
      const modelContext = getModelContext();
      if (typeof modelContext.request === "function") {
        return modelContext.request(request, resultSchema, options);
      }
      if (request.method === "tools/call") {
        const params = request.params ?? {};
        const name = params.name;
        const args = params.arguments ?? {};
        if (typeof name !== "string" || !name) {
          throw new Error("tools/call request missing tool name");
        }
        const result = typeof modelContext.executeTool === "function" ? await modelContext.executeTool(name, args, options) : await (() => {
          const tool = tools.find((entry) => entry.name === name);
          if (!tool) {
            throw new Error(`Tool not found: ${name}`);
          }
          return tool.execute(args, options);
        })();
        if (typeof resultSchema.parse === "function") {
          return resultSchema.parse(result);
        }
        return result;
      }
      if (request.method === "resources/read") {
        const params = request.params ?? {};
        const uri = params.uri;
        if (typeof uri !== "string" || !uri) {
          throw new Error("resources/read request missing uri");
        }
        const result = typeof modelContext.readResource === "function" ? await modelContext.readResource(uri, options) : await (() => {
          const resource = resources.find((entry) => entry.uri === uri);
          if (!resource) {
            throw new Error(`Resource not found: ${uri}`);
          }
          return resource.read(new URL(uri), void 0, options);
        })();
        if (typeof resultSchema.parse === "function") {
          return resultSchema.parse(result);
        }
        return result;
      }
      throw new Error(`Unsupported request method: ${request.method}`);
    }
  };
}
function tryRegisterToolsChangedListener(server, refresh, enabled) {
  if (!enabled) return;
  const protocolServer = server.server;
  try {
    protocolServer.setNotificationHandler(ToolListChangedNotificationSchema, refresh);
  } catch {
  }
}
async function registerMcpServerToolsAsPageTools(server, options = {}) {
  const refreshOnToolsChanged = options.refreshOnToolsChanged ?? true;
  const refresh = async () => {
    const tools = await convertRegisteredTools(server, options);
    await provideModelContextTools(tools);
  };
  await refresh();
  tryRegisterToolsChangedListener(server, refresh, refreshOnToolsChanged);
}
async function registerMcpServerResourcesAsPageResources(server, options = {}) {
  const [resources, templates, tools] = await Promise.all([
    convertRegisteredResources(server, options),
    convertRegisteredResourceTemplates(server, options),
    convertRegisteredTools(server, options)
  ]);
  await provideModelContextResources([...resources, ...templates]);
  return createClientLike(tools, resources, templates);
}
async function registerMcpServerAsPageContext(server, options = {}) {
  const refreshOnToolsChanged = options.refreshOnToolsChanged ?? true;
  const [resources, templates, tools] = await Promise.all([
    convertRegisteredResources(server, options),
    convertRegisteredResourceTemplates(server, options),
    convertRegisteredTools(server, options)
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
export {
  registerMcpServerAsPageContext,
  registerMcpServerResourcesAsPageResources,
  registerMcpServerToolsAsPageTools
};
//# sourceMappingURL=webmcp.js.map
