#!/usr/bin/env node

import { MCPServer } from '@core/MCPServer.js';
import { logger } from '@core/Logger.js';

// Import your custom tools, prompts, and resources
import { ExampleTool } from './tools/ExampleTool.js';
import { ExamplePrompt } from './prompts/ExamplePrompt.js';
import { ExampleResource } from './resources/ExampleResource.js';

async function main() {
  try {
    // Create the MCP server
    const server = new MCPServer({
      name: 'example-mcp-server',
      version: '1.0.0',
      description: 'Example MCP server built with mcp-framework boilerplate'
    });

    // Register your tools
    server.addTool(new ExampleTool());

    // Register your prompts
    server.addPrompt(new ExamplePrompt());

    // Register your resources
    server.addResource(new ExampleResource());

    // Start the server (transport is configured in the server constructor)
    await server.start();
    logger.info('Example MCP server started successfully');

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  logger.info('Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Shutting down server...');
  process.exit(0);
});

main().catch((error) => {
  logger.error('Unhandled error:', error);
  process.exit(1);
});
