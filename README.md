# 🎙️ AnveVoice OpenClaw Skill

> Connect your OpenClaw agent to [AnveVoice](https://anvevoice.com) — add AI voice assistants to websites for customer support, lead generation, accessibility, and engagement.

[![Customer Experience](https://img.shields.io/badge/Customer%20Experience-🎙️-blue)]()
[![Voice AI](https://img.shields.io/badge/Voice%20AI-🗣️-green)]()
[![Support](https://img.shields.io/badge/Support-🤝-orange)]()
[![Accessibility](https://img.shields.io/badge/Accessibility-♿-purple)]()

## What is AnveVoice?

AnveVoice lets businesses add **AI voice assistants** to their websites. Visitors talk naturally, and the AI answers questions, navigates pages, fills forms, captures leads, and completes tasks — all through voice.

**Perfect for:** Customer support automation, lead capture, website accessibility, sales assistance, education, healthcare intake, and e-commerce guidance.

This skill gives your OpenClaw agent full access to the AnveVoice platform via **46 MCP tools**.

## 🎯 Use Cases

- 🤖 **24/7 Customer Support** — Deflect repetitive tickets with instant voice answers
- 🎯 **Lead Generation** — Capture visitor contact info through natural conversations  
- ♿ **Accessibility** — Serve users who prefer voice over typing
- 📈 **Engagement** — Reduce bounce rates with interactive voice experiences
- 🎓 **Education** — Create voice-enabled learning experiences
- 🏥 **Healthcare** — Automate patient intake and appointment booking
- 🛒 **E-commerce** — Guide shoppers to products and handle orders
- 📊 **Analytics** — Understand visitor sentiment and conversation patterns

## Quick Start

### 1. Install the skill

```bash
openclaw skills install https://github.com/anvevoice/openclaw-skill
```

### 2. Get your API key

1. Go to [anvevoice.com/developer](https://anvevoice.com/developer)
2. Click **Generate API Key**
3. Copy the `anvk_...` key (shown only once)

### 3. Configure

```bash
openclaw config set ANVEVOICE_API_KEY anvk_your_key_here
```

### 4. Test

```bash
openclaw skills test anvevoice --input "ping"
```

## Tool Reference (46 tools)

| Group | Count | Tools |
|-------|-------|-------|
| **Bot Management** | 8 | `list_bots`, `get_bot`, `create_bot`, `update_bot`, `clone_bot`, `delete_bot`, `toggle_bot_status`, `get_bot_knowledge` |
| **Conversation Management** | 7 | `list_sessions`, `get_session`, `get_session_messages`, `list_visitors`, `get_visitor`, `get_visitor_sessions`, `search_conversations` |
| **Intelligence** | 5 | `summarize_session`, `get_session_summary`, `get_visitor_intelligence`, `extract_leads`, `get_session_intelligence` |
| **Analytics** | 6 | `get_analytics_overview`, `get_analytics_timeline`, `get_sentiment_trends`, `get_top_sessions`, `get_usage_stats`, `get_conversion_events` |
| **Feedback** | 4 | `list_feedback`, `get_feedback_stats`, `get_improvement_recommendations`, `get_fallback_analysis` |
| **Tools Config** | 2 | `get_bot_tools_config`, `update_bot_tools_config` |
| **Knowledge** | 3 | `add_knowledge_url`, `add_knowledge_text`, `delete_knowledge_source` |
| **Recordings** | 2 | `list_session_recordings`, `get_session_recording` |
| **Deployment** | 1 | `get_embed_code` |
| **Subscription** | 3 | `get_subscription`, `get_subscription_limits`, `get_billing_history` |
| **Global Analytics** | 1 | `get_global_analytics` |
| **Credentials** | 2 | `list_mcp_credentials`, `revoke_mcp_credential` |
| **System** | 2 | `ping`, `list_tools` |

## Example Usage

**"List my bots"** → `list_bots`

**"How is my support bot performing?"** → `get_analytics_overview` with `bot_id` and `from_date`

**"Extract leads from all conversations"** → `extract_leads` with `bot_id`

**"What are visitors asking about pricing?"** → `search_conversations` with `query: "pricing"`

**"Get the embed code for my bot"** → `get_embed_code` with `bot_id`

See the [examples/](./examples/) folder for full conversation scenarios.

## Technical Details

- **Protocol**: JSON-RPC 2.0 over HTTP POST
- **Server**: `https://aaxlcyouksuljvmypyhy.supabase.co/functions/v1/anve-mcp`
- **Auth**: `X-API-Key` header with `anvk_` prefixed key
- **Retry**: 3-tier exponential backoff (network → 429 → 5xx), max 4 attempts
- **Timeout**: 15 seconds per request

## Links

- [AnveVoice Dashboard](https://anvevoice.com/dashboard)
- [Developer API Page](https://anvevoice.com/developer)
- [Documentation](https://anvevoice.com/help)

## License

MIT — see [LICENSE](./LICENSE)
