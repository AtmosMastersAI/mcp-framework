# MCP Framework Boilerplate

A comprehensive TypeScript boilerplate for building Model Context Protocol (MCP) servers with modern development practices and path aliases.

## 🚀 Features

- **Type-safe**: Full TypeScript support with strong typing
- **Path Aliases**: Clean imports using TypeScript path mapping (`@core/*`, `@tools/*`, etc.)
- **Flexible**: Support for multiple transport protocols (stdio, SSE, WebSocket, HTTP)
- **Extensible**: Easy to add custom tools, prompts, and resources
- **Authentication**: Built-in support for JWT and API key authentication
- **CLI Tools**: Command-line interface for project management
- **Auto-discovery**: Automatic loading of tools, prompts, and resources
- **Testing**: Jest setup with coverage reporting
- **Linting**: ESLint and Prettier configuration
- **Examples**: Complete example implementations included

## 📁 Project Structure

```
mcp-framework-boilerplate/
├── src/                    # Framework source code
│   ├── auth/              # Authentication providers
│   ├── cli/               # CLI tools and commands
│   ├── core/              # Core server and client implementations
│   ├── loaders/           # Auto-discovery loaders
│   ├── prompts/           # Base prompt classes
│   ├── resources/         # Base resource classes
│   ├── tools/             # Base tool classes
│   ├── transports/        # Transport implementations
│   └── utils/             # Utility functions
├── examples/              # Example implementations
│   ├── tools/             # Example tools
│   ├── prompts/           # Example prompts
│   ├── resources/         # Example resources
│   └── server.ts          # Example server setup
├── tests/                 # Test files
└── dist/                  # Compiled JavaScript output
```

## 🛠️ Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd mcp-framework-boilerplate
npm install
```

### 2. Build the Framework

```bash
npm run build
```

### 3. Run the Example Server

```bash
node dist/examples/server.js
```

### 4. Create Your Own Tools

Create a new tool in `examples/tools/`:

```typescript
import { z } from 'zod';
import { BaseTool, ToolInput, ToolInputSchema } from '@tools/BaseTool.js';

interface MyToolInput {
  input: string;
}

const MyToolInputSchema: ToolInputSchema<MyToolInput> = {
  input: {
    type: z.string(),
    description: 'Input for my tool'
  }
};

export class MyTool extends BaseTool<MyToolInput> {
  name = 'my_tool';
  description = 'My custom tool';
  inputSchema = MyToolInputSchema;

  async execute(input: ToolInput<typeof MyToolInputSchema>) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `Processed: ${input.input}`
        }
      ]
    };
  }
}
```

## 📝 Path Aliases

This boilerplate uses TypeScript path aliases for clean imports:

- `@core/*` - Core framework components
- `@auth/*` - Authentication related code
- `@transport/*` - Transport implementations
- `@utils/*` - Utility functions
- `@cli/*` - CLI related code
- `@loaders/*` - Various loaders
- `@tools/*` - Tool implementations
- `@resources/*` - Resource implementations
- `@prompts/*` - Prompt implementations

Example usage:
```typescript
import { MCPServer } from '@core/MCPServer.js';
import { BaseTool } from '@tools/BaseTool.js';
import { logger } from '@core/Logger.js';
```

## 🧪 Testing

Run tests with coverage:

```bash
npm test
npm run test:coverage
```

Watch mode for development:

```bash
npm run test:watch
```

## 🔧 Development Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch mode compilation
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run dev` - Build and start development server

## 📚 CLI Tools

The boilerplate includes CLI tools for project management:

```bash
# Create a new MCP project
npm run mcp create my-project

# Add a new tool
npm run mcp add-tool my-tool

# Add a new prompt
npm run mcp add-prompt my-prompt

# Add a new resource
npm run mcp add-resource my-resource

# Build the framework
npm run mcp-build
```

## 🔐 Authentication

Built-in authentication providers:

### JWT Authentication
```typescript
import { JWTAuthProvider } from '@auth/providers/jwt.js';

const authProvider = new JWTAuthProvider({
  secret: 'your-secret-key',
  expiresIn: '1h'
});
```

### API Key Authentication
```typescript
import { APIKeyAuthProvider } from '@auth/providers/apikey.js';

const authProvider = new APIKeyAuthProvider({
  apiKeys: ['your-api-key']
});
```

## 🌐 Transport Options

### Stdio (for Claude Desktop)
```typescript
import { StdioServerTransport } from '@transport/stdio/server.js';
const transport = new StdioServerTransport();
```

### WebSocket
```typescript
import { WebSocketServerTransport } from '@transport/websockets/server.js';
const transport = new WebSocketServerTransport({ port: 8080 });
```

### SSE (Server-Sent Events)
```typescript
import { SSEServerTransport } from '@transport/sse/server.js';
const transport = new SSEServerTransport({ port: 8080 });
```

### HTTP Stream
```typescript
import { HttpStreamTransport } from '@transport/http/server.js';
const transport = new HttpStreamTransport({ port: 8080 });
```

## 📖 Examples

Check the `examples/` directory for complete implementations:

- **ExampleTool**: Demonstrates tool creation with input validation
- **ExamplePrompt**: Shows prompt creation with arguments
- **ExampleResource**: Illustrates resource management
- **server.ts**: Complete server setup example

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run `npm run lint` and `npm test`
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Check the `examples/` directory for implementation patterns
- Review the source code in `src/` for advanced usage
- Create issues for bugs or feature requests

