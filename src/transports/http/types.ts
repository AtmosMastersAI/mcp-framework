import {
  JSONRPCRequest,
  JSONRPCResponse,
  JSONRPCMessage,
  RequestId,
} from '@modelcontextprotocol/sdk/types.js';

export { JSONRPCRequest, JSONRPCResponse, JSONRPCMessage, RequestId };

/**
 * Response mode enum
 */
export type ResponseMode = 'stream' | 'batch';

/**
 * Session configuration for HTTP Stream transport
 */
export interface SessionConfig {
  /**
   * Whether to enable session management
   * Default: true
   */
  enabled?: boolean;

  /**
   * Header name for session ID
   * Default: "Mcp-Session-Id"
   */
  headerName?: string;

  /**
   * Whether to allow client-initiated session termination
   * Default: true
   */
  allowClientTermination?: boolean;

  /**
   * Maximum number of concurrent sessions
   * Default: 100
   */
  maxConcurrentSessions?: number;

  /**
   * Session timeout in milliseconds
   * Default: 300000 (5 minutes)
   */
  sessionTimeout?: number;
}

/**
 * Configuration options for Streamable HTTP transport that implements the MCP 2025-06-18 spec.
 * 
 * This defines the options for a transport that receives messages via HTTP POST and can respond
 * with either a single JSON response or open an SSE stream for streaming responses.
 */
export interface HttpStreamTransportConfig {
  /**
   * Port to run the HTTP server on, defaults to 8080
   */
  port?: number;

  /**
   * Endpoint path for MCP communication, defaults to "/mcp"
   */
  endpoint?: string;

  /**
   * Response mode: stream (Server-Sent Events) or batch (JSON)
   * Defaults to 'stream'
   */
  responseMode?: ResponseMode;

  /**
   * Timeout in milliseconds for batched messages
   * Only applies when responseMode is 'batch'
   */
  batchTimeout?: number;

  /**
   * Maximum message size in bytes
   */
  maxMessageSize?: number;

  /**
   * Session configuration
   */
  session?: SessionConfig;

  /**
   * Authentication configuration
   */
  auth?: any;

  /**
   * CORS configuration
   */
  cors?: any;
}

export const DEFAULT_SESSION_CONFIG: SessionConfig = {
  enabled: true,
  headerName: 'Mcp-Session-Id',
  allowClientTermination: true,
  maxConcurrentSessions: 100,
  sessionTimeout: 300000,
};

export const DEFAULT_HTTP_STREAM_CONFIG: HttpStreamTransportConfig = {
  port: 8080,
  endpoint: '/mcp',
  responseMode: 'stream',
  batchTimeout: 30000,
  maxMessageSize: 4 * 1024 * 1024,
  session: DEFAULT_SESSION_CONFIG,
};
