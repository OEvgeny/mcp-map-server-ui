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
  const registeredTemplates = server._registeredResourceTemplates ?? {};
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
  const resources = await convertRegisteredResources(server, options);
  await provideModelContextResources(resources);
}
export {
  registerMcpServerResourcesAsPageResources,
  registerMcpServerToolsAsPageTools
};
//# sourceMappingURL=webmcp.js.map
