import { MCPResource, ResourceContent } from '@resources/BaseResource.js';

export class ExampleResource extends MCPResource {
  uri = 'example://';
  name = 'example_resource';
  description = 'An example resource that demonstrates the framework capabilities';

  async read(): Promise<ResourceContent[]> {
    return [
      this.getConfigResource(),
      this.getDataResource()
    ];
  }

  private getConfigResource(): ResourceContent {
    return {
      uri: 'example://config',
      mimeType: 'application/json',
      text: JSON.stringify({
        name: 'Example MCP Server',
        version: '1.0.0',
        features: ['tools', 'prompts', 'resources'],
        settings: {
          debug: false,
          timeout: 30000
        }
      }, null, 2)
    };
  }

  private getDataResource(): ResourceContent {
    return {
      uri: 'example://data',
      mimeType: 'text/plain',
      text: `This is example data from the MCP Framework boilerplate.

This resource demonstrates how to:
- Define multiple resource URIs
- Return different content types
- Provide structured data

You can extend this to read from files, databases, APIs, or any other data source.`
    };
  }

  async readResource(uri: string): Promise<ResourceContent> {
    switch (uri) {
      case 'example://config':
        return this.getConfigResource();
      
      case 'example://data':
        return this.getDataResource();
      
      default:
        throw new Error(`Unknown resource URI: ${uri}`);
    }
  }
}
