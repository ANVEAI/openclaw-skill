/**
 * All 46 AnveVoice MCP tool names and group metadata.
 * Matches the MCP server's `list_tools` response exactly.
 */

// ── Tool Name Constants ──────────────────────────────────────────────────────

// Bot Management
export const LIST_BOTS = "list_bots";
export const GET_BOT = "get_bot";
export const CREATE_BOT = "create_bot";
export const UPDATE_BOT = "update_bot";
export const CLONE_BOT = "clone_bot";
export const DELETE_BOT = "delete_bot";
export const TOGGLE_BOT_STATUS = "toggle_bot_status";
export const GET_BOT_KNOWLEDGE = "get_bot_knowledge";

// Conversation Management
export const LIST_SESSIONS = "list_sessions";
export const GET_SESSION = "get_session";
export const GET_SESSION_MESSAGES = "get_session_messages";
export const LIST_VISITORS = "list_visitors";
export const GET_VISITOR = "get_visitor";
export const GET_VISITOR_SESSIONS = "get_visitor_sessions";
export const SEARCH_CONVERSATIONS = "search_conversations";

// Intelligence
export const SUMMARIZE_SESSION = "summarize_session";
export const GET_SESSION_SUMMARY = "get_session_summary";
export const GET_VISITOR_INTELLIGENCE = "get_visitor_intelligence";
export const EXTRACT_LEADS = "extract_leads";
export const GET_SESSION_INTELLIGENCE = "get_session_intelligence";

// Analytics
export const GET_ANALYTICS_OVERVIEW = "get_analytics_overview";
export const GET_ANALYTICS_TIMELINE = "get_analytics_timeline";
export const GET_SENTIMENT_TRENDS = "get_sentiment_trends";
export const GET_TOP_SESSIONS = "get_top_sessions";
export const GET_USAGE_STATS = "get_usage_stats";
export const GET_CONVERSION_EVENTS = "get_conversion_events";

// Feedback & Optimization
export const LIST_FEEDBACK = "list_feedback";
export const GET_FEEDBACK_STATS = "get_feedback_stats";
export const GET_IMPROVEMENT_RECOMMENDATIONS = "get_improvement_recommendations";
export const GET_FALLBACK_ANALYSIS = "get_fallback_analysis";

// Tools Configuration
export const GET_BOT_TOOLS_CONFIG = "get_bot_tools_config";
export const UPDATE_BOT_TOOLS_CONFIG = "update_bot_tools_config";

// Knowledge Management
export const ADD_KNOWLEDGE_URL = "add_knowledge_url";
export const ADD_KNOWLEDGE_TEXT = "add_knowledge_text";
export const DELETE_KNOWLEDGE_SOURCE = "delete_knowledge_source";

// Recordings
export const LIST_SESSION_RECORDINGS = "list_session_recordings";
export const GET_SESSION_RECORDING = "get_session_recording";

// Deployment
export const GET_EMBED_CODE = "get_embed_code";

// Subscription & Billing
export const GET_SUBSCRIPTION = "get_subscription";
export const GET_SUBSCRIPTION_LIMITS = "get_subscription_limits";
export const GET_BILLING_HISTORY = "get_billing_history";

// Global Analytics
export const GET_GLOBAL_ANALYTICS = "get_global_analytics";

// Credentials
export const LIST_MCP_CREDENTIALS = "list_mcp_credentials";
export const REVOKE_MCP_CREDENTIAL = "revoke_mcp_credential";

// System
export const PING = "ping";
export const LIST_TOOLS = "list_tools";

// ── All Tool Names ───────────────────────────────────────────────────────────

export const ALL_TOOLS = [
  LIST_BOTS, GET_BOT, CREATE_BOT, UPDATE_BOT, CLONE_BOT, DELETE_BOT, TOGGLE_BOT_STATUS, GET_BOT_KNOWLEDGE,
  LIST_SESSIONS, GET_SESSION, GET_SESSION_MESSAGES, LIST_VISITORS, GET_VISITOR, GET_VISITOR_SESSIONS, SEARCH_CONVERSATIONS,
  SUMMARIZE_SESSION, GET_SESSION_SUMMARY, GET_VISITOR_INTELLIGENCE, EXTRACT_LEADS, GET_SESSION_INTELLIGENCE,
  GET_ANALYTICS_OVERVIEW, GET_ANALYTICS_TIMELINE, GET_SENTIMENT_TRENDS, GET_TOP_SESSIONS, GET_USAGE_STATS, GET_CONVERSION_EVENTS,
  LIST_FEEDBACK, GET_FEEDBACK_STATS, GET_IMPROVEMENT_RECOMMENDATIONS, GET_FALLBACK_ANALYSIS,
  GET_BOT_TOOLS_CONFIG, UPDATE_BOT_TOOLS_CONFIG,
  ADD_KNOWLEDGE_URL, ADD_KNOWLEDGE_TEXT, DELETE_KNOWLEDGE_SOURCE,
  LIST_SESSION_RECORDINGS, GET_SESSION_RECORDING,
  GET_EMBED_CODE,
  GET_SUBSCRIPTION, GET_SUBSCRIPTION_LIMITS, GET_BILLING_HISTORY,
  GET_GLOBAL_ANALYTICS,
  LIST_MCP_CREDENTIALS, REVOKE_MCP_CREDENTIAL,
  PING, LIST_TOOLS,
] as const;

export type AnveToolName = (typeof ALL_TOOLS)[number];

// ── Group Metadata ───────────────────────────────────────────────────────────

export interface ToolGroup {
  name: string;
  count: number;
  tools: AnveToolName[];
}

export const TOOL_GROUPS: ToolGroup[] = [
  { name: "bot_management", count: 8, tools: [LIST_BOTS, GET_BOT, CREATE_BOT, UPDATE_BOT, CLONE_BOT, DELETE_BOT, TOGGLE_BOT_STATUS, GET_BOT_KNOWLEDGE] },
  { name: "conversation_management", count: 7, tools: [LIST_SESSIONS, GET_SESSION, GET_SESSION_MESSAGES, LIST_VISITORS, GET_VISITOR, GET_VISITOR_SESSIONS, SEARCH_CONVERSATIONS] },
  { name: "intelligence", count: 5, tools: [SUMMARIZE_SESSION, GET_SESSION_SUMMARY, GET_VISITOR_INTELLIGENCE, EXTRACT_LEADS, GET_SESSION_INTELLIGENCE] },
  { name: "analytics", count: 6, tools: [GET_ANALYTICS_OVERVIEW, GET_ANALYTICS_TIMELINE, GET_SENTIMENT_TRENDS, GET_TOP_SESSIONS, GET_USAGE_STATS, GET_CONVERSION_EVENTS] },
  { name: "feedback", count: 4, tools: [LIST_FEEDBACK, GET_FEEDBACK_STATS, GET_IMPROVEMENT_RECOMMENDATIONS, GET_FALLBACK_ANALYSIS] },
  { name: "tools_config", count: 2, tools: [GET_BOT_TOOLS_CONFIG, UPDATE_BOT_TOOLS_CONFIG] },
  { name: "knowledge_management", count: 3, tools: [ADD_KNOWLEDGE_URL, ADD_KNOWLEDGE_TEXT, DELETE_KNOWLEDGE_SOURCE] },
  { name: "recordings", count: 2, tools: [LIST_SESSION_RECORDINGS, GET_SESSION_RECORDING] },
  { name: "deployment", count: 1, tools: [GET_EMBED_CODE] },
  { name: "subscription", count: 3, tools: [GET_SUBSCRIPTION, GET_SUBSCRIPTION_LIMITS, GET_BILLING_HISTORY] },
  { name: "global_analytics", count: 1, tools: [GET_GLOBAL_ANALYTICS] },
  { name: "credentials", count: 2, tools: [LIST_MCP_CREDENTIALS, REVOKE_MCP_CREDENTIAL] },
  { name: "system", count: 2, tools: [PING, LIST_TOOLS] },
];
