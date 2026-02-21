/**
 * TypeScript type definitions for AnveVoice MCP tool inputs and outputs.
 */

// ── JSON-RPC 2.0 ─────────────────────────────────────────────────────────────

export interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: "tools/call";
  params: {
    name: string;
    arguments: Record<string, unknown>;
  };
}

export interface JsonRpcResponse<T = unknown> {
  jsonrpc: "2.0";
  id: string | number;
  result?: {
    content: Array<{ type: "text"; text: string }>;
  };
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

export interface AnveToolResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string;
}

// ── Bot Management ───────────────────────────────────────────────────────────

export interface ListBotsArgs {
  limit?: number;
  offset?: number;
}

export interface GetBotArgs {
  bot_id: string;
}

export interface CreateBotArgs {
  name: string;
  system_prompt?: string;
  welcome_message?: string;
  voice_id?: string;
  bot_type?: string;
  target_website?: string;
  widget_position?: string;
  widget_theme?: string;
}

export interface UpdateBotArgs {
  bot_id: string;
  name?: string;
  system_prompt?: string;
  welcome_message?: string;
  voice_id?: string;
  bot_type?: string;
  target_website?: string;
  widget_position?: string;
  widget_theme?: string;
}

export interface CloneBotArgs {
  bot_id: string;
  new_name: string;
}

export interface DeleteBotArgs {
  bot_id: string;
  soft_delete?: boolean;
}

export interface ToggleBotStatusArgs {
  bot_id: string;
}

export interface GetBotKnowledgeArgs {
  bot_id: string;
}

// ── Conversation Management ──────────────────────────────────────────────────

export interface ListSessionsArgs {
  bot_id?: string;
  status?: string;
  from_date?: string;
  to_date?: string;
  limit?: number;
  offset?: number;
}

export interface GetSessionArgs {
  session_id: string;
}

export interface GetSessionMessagesArgs {
  session_id: string;
  limit?: number;
}

export interface ListVisitorsArgs {
  bot_id: string;
  limit?: number;
  offset?: number;
}

export interface GetVisitorArgs {
  visitor_id: string;
}

export interface GetVisitorSessionsArgs {
  visitor_id: string;
  limit?: number;
}

export interface SearchConversationsArgs {
  query: string;
  bot_id?: string;
  from_date?: string;
  to_date?: string;
  limit?: number;
}

// ── Intelligence ─────────────────────────────────────────────────────────────

export interface SummarizeSessionArgs {
  session_id: string;
}

export interface GetSessionSummaryArgs {
  session_id: string;
}

export interface GetVisitorIntelligenceArgs {
  visitor_id: string;
}

export interface ExtractLeadsArgs {
  bot_id?: string;
  limit?: number;
}

export interface GetSessionIntelligenceArgs {
  session_id: string;
}

// ── Analytics ────────────────────────────────────────────────────────────────

export interface GetAnalyticsOverviewArgs {
  bot_id: string;
  from_date?: string;
  to_date?: string;
}

export interface GetAnalyticsTimelineArgs {
  bot_id: string;
  from_date?: string;
  to_date?: string;
}

export interface GetSentimentTrendsArgs {
  bot_id: string;
  from_date?: string;
  to_date?: string;
}

export interface GetTopSessionsArgs {
  bot_id: string;
  limit?: number;
  from_date?: string;
  to_date?: string;
}

export interface GetUsageStatsArgs {
  month?: string;
}

export interface GetConversionEventsArgs {
  bot_id: string;
  episode_types?: string[];
  from_date?: string;
  to_date?: string;
  limit?: number;
}

// ── Feedback ─────────────────────────────────────────────────────────────────

export interface ListFeedbackArgs {
  bot_id: string;
  min_rating?: number;
  max_rating?: number;
  from_date?: string;
  to_date?: string;
  limit?: number;
  offset?: number;
}

export interface GetFeedbackStatsArgs {
  bot_id: string;
  from_date?: string;
  to_date?: string;
}

export interface GetImprovementRecommendationsArgs {
  bot_id: string;
  depth?: "short" | "detailed" | "executive";
}

export interface GetFallbackAnalysisArgs {
  bot_id: string;
  from_date?: string;
  to_date?: string;
  limit?: number;
}

// ── Tools Config ─────────────────────────────────────────────────────────────

export interface GetBotToolsConfigArgs {
  bot_id: string;
}

export interface UpdateBotToolsConfigArgs {
  bot_id: string;
  tools: Record<string, { enabled?: boolean; frequency?: string }>;
}

// ── Knowledge Management ─────────────────────────────────────────────────────

export interface AddKnowledgeUrlArgs {
  bot_id: string;
  url: string;
  crawl_type?: "single" | "full_site";
  title?: string;
}

export interface AddKnowledgeTextArgs {
  bot_id: string;
  title: string;
  content: string;
}

export interface DeleteKnowledgeSourceArgs {
  source_id: string;
}

// ── Recordings ───────────────────────────────────────────────────────────────

export interface ListSessionRecordingsArgs {
  bot_id: string;
  limit?: number;
  offset?: number;
}

export interface GetSessionRecordingArgs {
  recording_id: string;
}

// ── Deployment ───────────────────────────────────────────────────────────────

export interface GetEmbedCodeArgs {
  bot_id: string;
}

// ── Subscription ─────────────────────────────────────────────────────────────

export interface GetSubscriptionLimitsArgs {
  month?: string;
}

export interface GetBillingHistoryArgs {
  limit?: number;
  offset?: number;
}

// ── Credentials ──────────────────────────────────────────────────────────────

export interface RevokeMcpCredentialArgs {
  credential_type: "api_key" | "oauth_client";
  credential_id: string;
}

// ── Global Analytics ─────────────────────────────────────────────────────────

export interface GetGlobalAnalyticsArgs {
  from_date?: string;
  to_date?: string;
}
