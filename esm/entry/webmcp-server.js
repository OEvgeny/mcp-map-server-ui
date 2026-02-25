import { BrowserMcpServer } from '@mcp-b/webmcp-ts-sdk';
import { createServer as createMCPServer } from 'out-root/server.js';

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
