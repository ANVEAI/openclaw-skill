/**
 * AnveVoice OpenClaw Skill — Entry Point
 *
 * Translates OpenClaw actions into MCP JSON-RPC 2.0 requests
 * to the AnveVoice platform.
 */

import { mcpCall } from "./client";
import { ALL_TOOLS } from "./tools";
import type { AnveToolResult } from "./types";

// Re-export for consumers
export { mcpCall } from "./client";
export * from "./tools";
export type { AnveToolName } from "./tools";
export type * from "./types";

/**
 * Call any AnveVoice MCP tool by name with arguments.
 *
 * @param toolName - One of the 46 AnveVoice tool names
 * @param args - Tool-specific arguments
 * @returns Parsed tool result with success/error status
 *
 * @example
 * ```ts
 * const result = await callAnveTool("list_bots", { limit: 5 });
 * if (result.success) {
 *   console.log(result.data);
 * }
 * ```
 */
export async function callAnveTool<T = unknown>(
  toolName: string,
  args: Record<string, unknown> = {}
): Promise<AnveToolResult<T>> {
  if (!ALL_TOOLS.includes(toolName as any)) {
    return {
      success: false,
      error: `Unknown tool: ${toolName}. Use list_tools to see all available tools.`,
    };
  }

  return mcpCall<T>(toolName, args);
}

/**
 * Quick health check — verifies the connection to AnveVoice.
 *
 * @example
 * ```ts
 * const ok = await ping();
 * console.log(ok); // { success: true, data: { status: "ok", ... } }
 * ```
 */
export async function ping(): Promise<AnveToolResult> {
  return mcpCall("ping");
}
