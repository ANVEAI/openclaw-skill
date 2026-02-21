/**
 * HTTP client for AnveVoice MCP server.
 * Sends JSON-RPC 2.0 requests with 3-tier retry and exponential backoff.
 */

import type { JsonRpcRequest, JsonRpcResponse, AnveToolResult } from "./types";

const MCP_SERVER_URL =
  "https://aaxlcyouksuljvmypyhy.supabase.co/functions/v1/anve-mcp";

const REQUEST_TIMEOUT_MS = 15_000;
const MAX_ATTEMPTS = 4;

function getApiKey(): string {
  const key = process.env.ANVEVOICE_API_KEY;
  if (!key) {
    throw new Error(
      `
┌─────────────────────────────────────────────────────────────────┐
│  🔑 ANVEVOICE_API_KEY is not set                                │
├─────────────────────────────────────────────────────────────────┤
│  To get your API key:                                           │
│                                                                 │
│  1. Go to https://anvevoice.com/developer                       │
│  2. Sign in to your AnveVoice account                           │
│  3. Click "Generate API Key"                                    │
│  4. Copy the key (starts with "anvk_")                          │
│                                                                 │
│  Then configure it with:                                        │
│  $ openclaw config set ANVEVOICE_API_KEY anvk_your_key_here     │
│                                                                 │
│  Or set as environment variable:                                │
│  $ export ANVEVOICE_API_KEY=anvk_your_key_here                  │
└─────────────────────────────────────────────────────────────────┘
    `.trim()
    );
  }
  return key;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Determines backoff delay in milliseconds based on HTTP status and attempt number.
 *
 * Retry tiers:
 *   - Network error: immediate retry (0ms)
 *   - 429 rate limit: 1s → 2s → 4s
 *   - 5xx server error: 2s → 4s → 8s
 */
function getBackoffMs(
  status: number | null,
  attempt: number
): number {
  if (status === null) return 0; // network error — immediate
  if (status === 429) return 1000 * Math.pow(2, attempt - 1); // 1s, 2s, 4s
  if (status >= 500) return 2000 * Math.pow(2, attempt - 1); // 2s, 4s, 8s
  return 0;
}

function isRetryable(status: number | null): boolean {
  if (status === null) return true; // network error
  if (status === 429) return true;
  if (status >= 500) return true;
  return false;
}

let requestId = 0;

/**
 * Send a JSON-RPC 2.0 `tools/call` request to the AnveVoice MCP server.
 */
export async function mcpCall<T = unknown>(
  toolName: string,
  args: Record<string, unknown> = {}
): Promise<AnveToolResult<T>> {
  const apiKey = getApiKey();
  requestId += 1;

  const body: JsonRpcRequest = {
    jsonrpc: "2.0",
    id: requestId,
    method: "tools/call",
    params: { name: toolName, arguments: args },
  };

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let status: number | null = null;

    try {
      const response = await fetch(MCP_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeout);
      status = response.status;

      if (status === 401) {
        return {
          success: false,
          error: "Authentication failed. Check your ANVEVOICE_API_KEY.",
        };
      }

      if (!isRetryable(status) || attempt === MAX_ATTEMPTS) {
        const json = (await response.json()) as JsonRpcResponse<T>;

        if (json.error) {
          return {
            success: false,
            error: json.error.message,
            details: json.error.data ? String(json.error.data) : undefined,
          };
        }

        // Parse the MCP tool result from the content array
        const text = json.result?.content?.[0]?.text;
        if (text) {
          try {
            return JSON.parse(text) as AnveToolResult<T>;
          } catch {
            return { success: true, data: text as unknown as T };
          }
        }

        return { success: true, data: json.result as unknown as T };
      }
    } catch (err) {
      clearTimeout(timeout);
      lastError = err instanceof Error ? err : new Error(String(err));
      status = null; // network error
    }

    // Wait before retry
    if (attempt < MAX_ATTEMPTS) {
      const backoff = getBackoffMs(status, attempt);
      if (backoff > 0) await delay(backoff);
    }
  }

  return {
    success: false,
    error: `Request failed after ${MAX_ATTEMPTS} attempts`,
    details: lastError?.message,
  };
}
