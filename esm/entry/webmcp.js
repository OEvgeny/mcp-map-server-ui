import { McpServer as BaseMcpServer } from 'out-root/mcp.js';
import { mergeCapabilities } from 'out-root/mcp.js';
import {
    ListToolsRequestSchema,
    CallToolRequestSchema,
    ListResourcesRequestSchema,
    ReadResourceRequestSchema,
    ListPromptsRequestSchema,
    GetPromptRequestSchema,
} from 'out-root/mcp.js';
import { Validator } from '@cfworker/json-schema';
import { zodToJsonSchema } from 'zod-to-json-schema';

function validateArgsWithSchema(args, schema) {
    const result = new Validator(schema, "2020-12", true).validate(args);
    if (result.valid) return null;
    const error = result.errors[result.errors.length - 1];
    if (!error) return { message: "Input validation failed" };
    return { message: error.error };
}

function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

class JsonSchemaValidator {
    getValidator(schema) {
        return (input) => {
            if (!isPlainObject(input)) return {
                valid: false,
                data: void 0,
                errorMessage: "expected object arguments"
            };
            const issue = validateArgsWithSchema(input, schema);
            if (issue) return {
                valid: false,
                data: void 0,
                errorMessage: issue.message
            };
            return {
                valid: true,
                data: input,
                errorMessage: void 0
            };
        };
    }
};

const DEFAULT_INPUT_SCHEMA = { type: 'object', properties: {} };

function zodSchemaToJsonSchema(zodSchema) {
    if (!zodSchema) return DEFAULT_INPUT_SCHEMA;
    try { return zodToJsonSchema(zodSchema); } catch (_) { return DEFAULT_INPUT_SCHEMA; }
}

/**
 * Convert an MCP _registeredTools entry into a WebMCP tool descriptor.
 */
function mcpToolToDescriptor(name, mcpTool) {
    return {
        name,
        title: mcpTool.title,
        description: mcpTool.description ?? '',
        inputSchema: zodSchemaToJsonSchema(mcpTool.inputSchema),
        ...(mcpTool.outputSchema ? { outputSchema: zodSchemaToJsonSchema(mcpTool.outputSchema) } : {}),
        ...(mcpTool.annotations ? { annotations: mcpTool.annotations } : {}),
        ...(mcpTool._meta ? { _meta: mcpTool._meta } : {}),
        execute: async (args) => {
            return mcpTool.inputSchema ? mcpTool.handler(args, {}) : mcpTool.handler({});
        },
        _mcp: mcpTool,
    };
}

/**
 * Convert an MCP _registeredResources entry into a WebMCP resource descriptor.
 */
function mcpResourceToDescriptor(uri, mcpResource) {
    return {
        uri,
        name: mcpResource.name,
        description: mcpResource.metadata?.description,
        mimeType: mcpResource.metadata?.mimeType,
        read: async (url) => mcpResource.readCallback(url, {}),
        _mcp: mcpResource,
    };
}

/**
 * Convert an MCP _registeredPrompts entry into a WebMCP prompt descriptor.
 */
function mcpPromptToDescriptor(name, mcpPrompt) {
    return {
        name,
        title: mcpPrompt.title,
        description: mcpPrompt.description ?? '',
        ...(mcpPrompt.argsSchema ? { argsSchema: zodSchemaToJsonSchema(mcpPrompt.argsSchema) } : {}),
        get: async (args) => mcpPrompt.argsSchema ? mcpPrompt.callback(args, {}) : mcpPrompt.callback({}),
        _mcp: mcpPrompt,
    };
}

function normalizeToolResponse(value) {
    if (value &&
        typeof value === 'object' &&
        'content' in value &&
        Array.isArray(value.content)) {
        return value;
    }
    const text = typeof value === 'string' ? value : JSON.stringify(value);
    return {
        content: [{ type: 'text', text }],
        isError: false,
    };
}
/**
 * WebMCP facade for BrowserModelContextServer.
 * Provides WebMCP-style descriptor-based registration APIs.
 */
export class WebMcpFacade {
    server;
    constructor(server) {
        this.server = server;
    }
    registerTool(tool) {
        return this.server.registerToolWebMcp(tool);
    }
    unregisterTool(name) {
        this.server.unregisterToolInternal(name);
    }
    provideContext(options) {
        this.server.clearContext();
        for (const tool of options?.tools ?? []) {
            this.registerTool(tool);
        }
    }
    clearContext() {
        this.server.clearContext();
    }
    registerResource(descriptor) {
        return this.server.registerResourceWebMcp(descriptor);
    }
    listResources() {
        return this.server.listResourcesInternal();
    }
    readResource(uri) {
        return this.server.readResourceInternal(uri);
    }
    registerPrompt(descriptor) {
        return this.server.registerPromptWebMcp(descriptor);
    }
    listPrompts() {
        return this.server.listPromptsInternal();
    }
    getPrompt(name, args) {
        return this.server.getPromptInternal(name, args);
    }
    listTools() {
        return this.server.listToolsInternal();
    }
    callTool(params) {
        return this.server.callToolInternal(params.name, params.arguments);
    }
    executeTool(name, args) {
        return this.server.callToolInternal(name, args);
    }
    syncNativeTools() {
        return this.server.syncNativeToolsInternal();
    }
    ejectTools() {
        return this.server.ejectToolsFromNative();
    }
    setupTools() {
        return this.server.setupToolsToNative();
    }
}
/**
 * BrowserModelContextServer is a browser-capable MCP server that preserves the standard
 * MCP server API and adds a `webmcp` namespace for WebMCP-compatible registration and
 * context management. It supports dynamic registration after transport connection and
 * mirrors tools, resources, and prompts into a native implementation when supported.
 */
export class BrowserModelContextServer extends BaseMcpServer {
    webmcp;
    native;
    tools = new Map();
    resources = new Map();
    prompts = new Map();
    validator;
    connected = false;
    constructor(serverInfo, options) {
        const enhancedOptions = {
            capabilities: mergeCapabilities(options?.capabilities || {}, {
                tools: { listChanged: true },
                resources: { listChanged: true },
                prompts: { listChanged: true },
            }),
        };
        super(serverInfo, enhancedOptions);
        this.validator = new JsonSchemaValidator();
        this.native = options?.native;
        this.webmcp = new WebMcpFacade(this);
    }
    registerToolWebMcp(tool) {
        if (this.tools.has(tool.name)) {
            throw new Error(`Tool ${tool.name} already registered`);
        }
        let nativeRegistered = false;
        if (this.native) {
            try {
                this.native.registerTool(tool);
                nativeRegistered = true;
            }
            catch (error) {
                console.warn(`Failed to register tool ${tool.name} in native:`, error);
            }
        }
        this.tools.set(tool.name, { descriptor: tool, nativeRegistered });
        if (this.connected) {
            this.server.notification({ method: 'notifications/tools/list_changed' });
        }
        return {
            unregister: () => this.unregisterToolInternal(tool.name),
        };
    }
    unregisterToolInternal(name) {
        const tool = this.tools.get(name);
        if (!tool) {
            return;
        }
        this.tools.delete(name);
        if (tool.nativeRegistered && this.native) {
            try {
                this.native.unregisterTool(name);
            }
            catch (error) {
                console.warn(`Failed to unregister tool ${name} from native:`, error);
            }
        }
        if (this.connected) {
            this.server.notification({ method: 'notifications/tools/list_changed' });
        }
    }
    clearContext() {
        const toolNames = Array.from(this.tools.keys());
        for (const name of toolNames) {
            this.unregisterToolInternal(name);
        }
        if (this.native) {
            try {
                this.native.clearContext();
            }
            catch (error) {
                console.warn('Failed to clear native context:', error);
            }
        }
    }
    /**
     * Sync _registeredTools (MCP API) into the tools Map as WebMCP descriptors,
     * then push any unregistered tools to native.
     */
    syncMcpTools() {
        const mcpTools = this._registeredTools;
        // Add/update MCP tools into our Map
        for (const [name, mcpTool] of Object.entries(mcpTools)) {
            if (!mcpTool.enabled) {
                // Disabled in MCP — remove from our map if it was synced from MCP
                const existing = this.tools.get(name);
                if (existing?.descriptor._mcp) {
                    this.tools.delete(name);
                    if (existing.nativeRegistered && this.native) {
                        try { this.native.unregisterTool(name); } catch (_) { }
                    }
                }
                continue;
            }
            const existing = this.tools.get(name);
            if (existing?.descriptor._mcp === mcpTool) continue; // already synced, same object
            const descriptor = mcpToolToDescriptor(name, mcpTool);
            let nativeRegistered = existing?.nativeRegistered ?? false;
            if (this.native && !nativeRegistered) {
                try { this.native.registerTool(descriptor); nativeRegistered = true; } catch (_) { }
            }
            this.tools.set(name, { descriptor, nativeRegistered });
        }
        // Remove tools that were synced from MCP but no longer exist there
        for (const [name, entry] of this.tools) {
            if (entry.descriptor._mcp && !(name in mcpTools)) {
                this.tools.delete(name);
                if (entry.nativeRegistered && this.native) {
                    try { this.native.unregisterTool(name); } catch (_) { }
                }
            }
        }
    }
    /**
     * Sync _registeredResources (MCP API) into the resources Map as WebMCP descriptors.
     */
    syncMcpResources() {
        const mcpResources = this._registeredResources;
        for (const [uri, mcpResource] of Object.entries(mcpResources)) {
            if (!mcpResource.enabled) {
                const existing = this.resources.get(uri);
                if (existing?.descriptor._mcp) this.resources.delete(uri);
                continue;
            }
            const existing = this.resources.get(uri);
            if (existing?.descriptor._mcp === mcpResource) continue;
            this.resources.set(uri, { descriptor: mcpResourceToDescriptor(uri, mcpResource), nativeRegistered: false });
        }
        for (const [uri, entry] of this.resources) {
            if (entry.descriptor._mcp && !(uri in mcpResources)) this.resources.delete(uri);
        }
    }
    /**
     * Sync _registeredPrompts (MCP API) into the prompts Map as WebMCP descriptors.
     */
    syncMcpPrompts() {
        const mcpPrompts = this._registeredPrompts;
        for (const [name, mcpPrompt] of Object.entries(mcpPrompts)) {
            if (!mcpPrompt.enabled) {
                const existing = this.prompts.get(name);
                if (existing?.descriptor._mcp) this.prompts.delete(name);
                continue;
            }
            const existing = this.prompts.get(name);
            if (existing?.descriptor._mcp === mcpPrompt) continue;
            this.prompts.set(name, { descriptor: mcpPromptToDescriptor(name, mcpPrompt), nativeRegistered: false });
        }
        for (const [name, entry] of this.prompts) {
            if (entry.descriptor._mcp && !(name in mcpPrompts)) this.prompts.delete(name);
        }
    }
    /**
     * Override McpServer's sendToolListChanged to sync MCP tools and native.
     */
    sendToolListChanged() {
        this.syncMcpTools();
        super.sendToolListChanged();
    }
    /**
     * Override McpServer's sendResourceListChanged to sync MCP resources.
     */
    sendResourceListChanged() {
        this.syncMcpResources();
        super.sendResourceListChanged();
    }
    /**
     * Override McpServer's sendPromptListChanged to sync MCP prompts.
     */
    sendPromptListChanged() {
        this.syncMcpPrompts();
        super.sendPromptListChanged();
    }
    /**
     * Remove all tools from native. Tools remain registered in the MCP server.
     */
    ejectToolsFromNative() {
        if (!this.native) return 0;
        let ejected = 0;
        for (const [name, entry] of this.tools) {
            if (!entry.nativeRegistered) continue;
            try {
                this.native.unregisterTool(name);
                entry.nativeRegistered = false;
                ejected++;
            } catch (_) { }
        }
        return ejected;
    }
    /**
     * Register all tools into native. Counterpart to ejectToolsFromNative.
     */
    setupToolsToNative() {
        if (!this.native) return 0;
        let added = 0;
        for (const [name, entry] of this.tools) {
            if (entry.nativeRegistered) continue;
            try {
                this.native.registerTool(entry.descriptor);
                entry.nativeRegistered = true;
                added++;
            } catch (_) { }
        }
        return added;
    }
    /**
     * Symbol.dispose – unregister all tools and close the server.
     */
    [Symbol.dispose]() {
        this.ejectToolsFromNative();
        this.clearContext();
    }
    syncNativeToolsInternal() {
        let synced = 0;
        const nativeTools = this.native?.listTools?.() || this.native.tools && this.native.tools.entries().map(([name, descriptor]) => ({ name, ...descriptor }))
        for (const nativeTool of nativeTools) {
            if (!nativeTool?.name || this.tools.has(nativeTool.name)) {
                continue;
            }
            const descriptor = {
                name: nativeTool.name,
                description: nativeTool.description ?? '',
                inputSchema: nativeTool.inputSchema ?? DEFAULT_INPUT_SCHEMA,
                execute: async (args, client) => {
                    if (typeof nativeTool.execute === 'function') {
                        return nativeTool.execute(args, client);
                    }
                    return nativeApi.callTool({ name: nativeTool.name, arguments: args });
                },
                ...(nativeTool._meta ? { _meta: nativeTool._meta } : {}),
            };
            this.tools.set(nativeTool.name, { descriptor, nativeRegistered: true });
            synced++;
        }
        if (synced > 0 && this.connected) {
            this.server.notification({ method: 'notifications/tools/list_changed' });
        }
        return synced;
    }
    registerResourceWebMcp(descriptor) {
        if (this.resources.has(descriptor.uri)) {
            throw new Error(`Resource ${descriptor.uri} already registered`);
        }
        this.resources.set(descriptor.uri, { descriptor, nativeRegistered: false });
        if (this.connected) {
            this.server.notification({ method: 'notifications/resources/list_changed' });
        }
        return {
            unregister: () => {
                this.resources.delete(descriptor.uri);
                if (this.connected) {
                    this.server.notification({ method: 'notifications/resources/list_changed' });
                }
            },
        };
    }
    listResourcesInternal() {
        return Array.from(this.resources.values()).map((r) => ({
            uri: r.descriptor.uri,
            name: r.descriptor.name,
            description: r.descriptor.description,
            mimeType: r.descriptor.mimeType,
        }));
    }
    async readResourceInternal(uri) {
        const resource = this.resources.get(uri);
        if (!resource) {
            throw new Error(`Resource not found: ${uri}`);
        }
        return resource.descriptor.read(new URL(uri));
    }
    registerPromptWebMcp(descriptor) {
        if (this.prompts.has(descriptor.name)) {
            throw new Error(`Prompt ${descriptor.name} already registered`);
        }
        this.prompts.set(descriptor.name, { descriptor, nativeRegistered: false });
        if (this.connected) {
            this.server.notification({ method: 'notifications/prompts/list_changed' });
        }
        return {
            unregister: () => {
                this.prompts.delete(descriptor.name);
                if (this.connected) {
                    this.server.notification({ method: 'notifications/prompts/list_changed' });
                }
            },
        };
    }
    listPromptsInternal() {
        return Array.from(this.prompts.values()).map((p) => {
            const schema = p.descriptor.argsSchema;
            return {
                name: p.descriptor.name,
                description: p.descriptor.description,
                ...(schema?.properties
                    ? {
                        arguments: Object.entries(schema.properties).map(([argName, prop]) => ({
                            name: argName,
                            ...(typeof prop === 'object' && prop !== null && 'description' in prop
                                ? { description: prop.description }
                                : {}),
                            ...(schema.required?.includes(argName) ? { required: true } : {}),
                        })),
                    }
                    : {}),
            };
        });
    }
    async getPromptInternal(name, args = {}) {
        const prompt = this.prompts.get(name);
        if (!prompt) {
            throw new Error(`Prompt not found: ${name}`);
        }
        if (prompt.descriptor.argsSchema) {
            const validator = this.validator.getValidator(prompt.descriptor.argsSchema);
            const result = validator(args);
            if (!result.valid) {
                throw new Error(`Invalid arguments for prompt ${name}: ${result.errorMessage}`);
            }
        }
        return prompt.descriptor.get(args);
    }
    listToolsInternal() {
        return Array.from(this.tools.values()).map((t) => ({
            name: t.descriptor.name,
            description: t.descriptor.description ?? '',
            inputSchema: t.descriptor.inputSchema ?? DEFAULT_INPUT_SCHEMA,
            ...(t.descriptor.outputSchema ? { outputSchema: t.descriptor.outputSchema } : {}),
            ...(t.descriptor.annotations ? { annotations: t.descriptor.annotations } : {}),
            ...(t.descriptor._meta ? { _meta: t.descriptor._meta } : {}),
        }));
    }
    async callToolInternal(name, args = {}) {
        const tool = this.tools.get(name);
        if (!tool) {
            throw new Error(`Tool not found: ${name}`);
        }
        if (tool.descriptor.inputSchema) {
            const validator = this.validator.getValidator(tool.descriptor.inputSchema);
            const result = validator(args);
            if (!result.valid) {
                throw new Error(`Invalid arguments for tool ${name}: ${result.errorMessage}`);
            }
        }
        const client = {
            requestUserInteraction: async (cb) => cb(),
        };
        return normalizeToolResponse(await tool.descriptor.execute(args, client));
    }
    async connect(transport) {
        // this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
        //     tools: this.listToolsInternal(),
        // }));
        // this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
        //     const result = await this.callToolInternal(request.params.name, request.params.arguments);
        //     return result;
        // });
        // this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
        //     resources: this.listResourcesInternal(),
        // }));
        // this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
        //     const result = await this.readResourceInternal(request.params.uri);
        //     return result;
        // });
        // this.server.setRequestHandler(ListPromptsRequestSchema, async () => ({
        //     prompts: this.listPromptsInternal(),
        // }));
        // this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
        //     const result = await this.getPromptInternal(request.params.name, request.params.arguments);
        //     return result;
        // });
        this.connected = true;
        return super.connect(transport);
    }
}
