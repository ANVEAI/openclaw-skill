---
name: anvevoice
description: "Manage AnveVoice AI voice bots — create, configure, analyze, and deploy voice assistants for websites."
metadata:
  openclaw.requires.env:
    - ANVEVOICE_API_KEY
  primaryEnv: ANVEVOICE_API_KEY
  emoji: "🎙️"
  homepage: "https://anvevoice.com"
  version: "1.0.0"
  author: "AnveVoice"
  license: "MIT"
---

# AnveVoice Skill

AnveVoice is a SaaS platform that lets businesses add AI voice assistants to their websites. This skill gives you full control over the platform via 46 MCP tools.

## Authentication

All requests require an API key sent as `X-API-Key` header. Users generate keys at [anvevoice.com/developer](https://anvevoice.com/developer). Keys are prefixed with `anvk_`.

The key is read from `process.env.ANVEVOICE_API_KEY`.

## MCP Server

- **Endpoint**: `https://aaxlcyouksuljvmypyhy.supabase.co/functions/v1/anve-mcp`
- **Protocol**: JSON-RPC 2.0 over HTTP POST
- **Method**: `tools/call`

## Tools (46 total)

### Bot Management (8)
| Tool | Description |
|------|-------------|
| `list_bots` | List all voice bots. Supports pagination (limit, offset). |
| `get_bot` | Get full configuration of a bot by ID. |
| `create_bot` | Create a new voice bot with name, system prompt, voice, and tools config. |
| `update_bot` | Update a bot's configuration. Only provided fields are updated. |
| `clone_bot` | Duplicate a bot with a new name. All configuration is copied. |
| `delete_bot` | Delete or deactivate a bot. Use soft_delete=true to pause. |
| `toggle_bot_status` | Toggle between active and paused states. |
| `get_bot_knowledge` | List all knowledge sources attached to a bot. |

### Conversation Management (7)
| Tool | Description |
|------|-------------|
| `list_sessions` | List conversation sessions with filters by bot, date range, status. |
| `get_session` | Get full session detail including messages and tool calls. |
| `get_session_messages` | Get all messages for a specific session. |
| `list_visitors` | List unique visitors for a bot with profiles. |
| `get_visitor` | Get full visitor profile with extracted facts and episodes. |
| `get_visitor_sessions` | Get all sessions for a specific visitor. |
| `search_conversations` | Full-text search across all conversation messages. |

### Intelligence (5)
| Tool | Description |
|------|-------------|
| `summarize_session` | Trigger AI summarization for a session. |
| `get_session_summary` | Fetch stored AI summary for a session. |
| `get_visitor_intelligence` | Get full intelligence profile: facts, preferences, episodes, sentiment. |
| `extract_leads` | Get visitors with captured contact info (email, phone, name). |
| `get_session_intelligence` | Get structured analysis: topics, intent, sentiment, action items. |

### Analytics (6)
| Tool | Description |
|------|-------------|
| `get_analytics_overview` | Aggregated overview: sessions, messages, avg duration, unique visitors. |
| `get_analytics_timeline` | Day-by-day session and message counts over a date range. |
| `get_sentiment_trends` | Visitor sentiment distribution and trends over time. |
| `get_top_sessions` | Highest-engagement sessions ordered by message count. |
| `get_usage_stats` | Token usage and cost breakdown across all bots. |
| `get_conversion_events` | Sessions with purchase intent, form completions, or lead captures. |

### Feedback & Optimization (4)
| Tool | Description |
|------|-------------|
| `list_feedback` | Get rated sessions with user comments, ordered by rating. |
| `get_feedback_stats` | Aggregate feedback: average rating, distribution, NPS score. |
| `get_improvement_recommendations` | AI-driven recommendations based on low-rated and abandoned sessions. |
| `get_fallback_analysis` | Analyze tool failures and abandoned states. |

### Tools Configuration (2)
| Tool | Description |
|------|-------------|
| `get_bot_tools_config` | Get current tool toggles and frequencies for a bot. |
| `update_bot_tools_config` | Update tool toggles and frequencies (deep-merged). |

### Knowledge Management (3)
| Tool | Description |
|------|-------------|
| `add_knowledge_url` | Add a URL and trigger scraping (single page or full site). |
| `add_knowledge_text` | Add raw text content as knowledge (FAQ, product descriptions). |
| `delete_knowledge_source` | Delete a knowledge source after ownership verification. |

### Recordings (2)
| Tool | Description |
|------|-------------|
| `list_session_recordings` | List sessions with voice recordings, duration, and file size. |
| `get_session_recording` | Get a 1-hour signed URL for a session's audio recording. |

### Deployment (1)
| Tool | Description |
|------|-------------|
| `get_embed_code` | Generate the HTML embed snippet for a bot. |

### Subscription & Billing (3)
| Tool | Description |
|------|-------------|
| `get_subscription` | Get current plan details, status, and billing interval. |
| `get_subscription_limits` | Current usage vs. plan limits with remaining quotas. |
| `get_billing_history` | Payment history with invoice URLs and amounts. |

### Global Analytics (1)
| Tool | Description |
|------|-------------|
| `get_global_analytics` | Aggregated analytics across ALL bots with per-bot breakdown. |

### Credentials (2)
| Tool | Description |
|------|-------------|
| `list_mcp_credentials` | List all API keys and OAuth clients. |
| `revoke_mcp_credential` | Revoke an API key or OAuth client by ID. |

### System (2)
| Tool | Description |
|------|-------------|
| `ping` | Health check — returns server status, version, and timestamp. |
| `list_tools` | Returns all available tools with descriptions grouped by category. |

## Common Patterns

### List bots and check status
```
call list_bots with { limit: 10 }
```

### Get analytics for a bot this month
```
call get_analytics_overview with { bot_id: "UUID", from_date: "2025-02-01" }
```

### Extract leads from a bot
```
call extract_leads with { bot_id: "UUID" }
```

### Search conversations
```
call search_conversations with { query: "pricing", bot_id: "UUID" }
```

## Error Handling

- **401**: Invalid or missing API key. Verify `ANVEVOICE_API_KEY` is set correctly.
- **403**: Ownership error — you can only access your own bots and data.
- **429**: Rate limited. The skill retries automatically with exponential backoff.
- **5xx**: Server error. The skill retries automatically up to 4 attempts.

All tool responses follow `{ success: true, data: {...} }` or `{ success: false, error: "message" }`.
