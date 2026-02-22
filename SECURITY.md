# Security Policy

## Overview

AnveVoice OpenClaw Skill enables voice AI integration for websites. This document outlines security considerations, data handling, and external dependencies.

## VirusTotal Verification

| Attribute | Value |
|-----------|-------|
| **Scan Date** | February 21, 2026 |
| **Detection Rate** | 0/62 vendors flagged as malicious |
| **Status** | ✅ CLEAN |
| **File** | SKILL.md (16.63 KB) |
| **SHA256 Hash** | f3c788a5cfa2a01b67edd6af451ee6748944818f20b7d51203ecf5cf8d4c837b |

**[View Full Scan Report on VirusTotal →](https://www.virustotal.com/gui/file/f3c788a5cfa2a01b67edd6af451ee6748944818f20b7d51203ecf5cf8d4c837b?nocache=1)**

---

## External Dependencies & Data Handling

### API Endpoints

This skill communicates with the following endpoints:

| Endpoint | Purpose | Data Transmitted |
|----------|---------|------------------|
| `https://aaxlcyouksuljvmypyhy.supabase.co/functions/v1/anve-mcp` | MCP server | API requests, bot configs |
| `https://anvevoice.com` | Dashboard & docs | Auth tokens, analytics |

### Widget Embed Script (Visitor-Facing)

When you deploy a voice bot, the following external script is embedded in your website:

```html
<script src="https://anvevoice.com/embed.js" 
        data-bot-id="YOUR_BOT_ID"
        async>
</script>
```

**What this script does:**
- Loads the voice widget UI in the visitor's browser
- Captures microphone input (with user permission)
- Transmits voice data to AnveVoice servers for processing
- Displays AI responses and handles conversation flow

**Data collected from visitors:**
- Voice recordings (if enabled)
- Conversation transcripts
- Browser metadata (for analytics)
- Optional: Contact info (email, phone) if shared during conversation

---

## Authentication

- **API Key Required:** `ANVEVOICE_API_KEY` (starts with `anvk_`)
- **Storage:** Environment variable only — never hardcoded
- **Scope:** Configure minimal required permissions at anvevoice.com/developer

### Recommended API Key Permissions

| Use Case | Recommended Scope |
|----------|-------------------|
| Read-only analytics | Read Only |
| Bot management | Bots + Knowledge |
| Lead extraction | Leads + Analytics |
| Full access | Full Access (admin only) |

---

## Security Best Practices

### For Skill Users (Developers/Agents)

1. **Use environment variables:**
   ```bash
   export ANVEVOICE_API_KEY=anvk_your_key_here
   ```

2. **Minimize API key scope:**
   - Don't use "Full Access" unless necessary
   - Create separate keys for different environments (dev/staging/prod)

3. **Rotate keys regularly:**
   - Revoke old keys at anvevoice.com/developer
   - Generate new keys every 90 days

4. **Monitor usage:**
   - Check analytics for unexpected activity
   - Review conversation logs periodically

### For Website Owners (End Users)

1. **HTTPS required:** Widget only works on HTTPS sites (for microphone security)

2. **Privacy policy:**
   - Disclose voice data collection in your privacy policy
   - Link to AnveVoice's privacy policy: https://anvevoice.com/privacy

3. **User consent:**
   - Widget requests microphone permission before recording
   - Users can decline and use text input instead (if configured)

4. **Data retention:**
   - Configure recording retention in AnveVoice dashboard
   - Default: 30 days (adjustable)

---

## Compliance

| Regulation | Status | Notes |
|------------|--------|-------|
| **GDPR** | ✅ Compliant | Data processing agreement available |
| **CCPA** | ✅ Compliant | California privacy rights supported |
| **HIPAA** | ⚠️ Review required | Contact for BAA if handling PHI |

---

## Reporting Security Issues

If you discover a security vulnerability:

1. **Email:** security@anvevoice.com
2. **Subject:** [SECURITY] Brief description
3. **Do not** publicly disclose until patched

We follow responsible disclosure and will acknowledge within 24 hours.

---

## Badge

```markdown
[![VirusTotal](https://img.shields.io/badge/VirusTotal-0%2F62%20Clean-brightgreen?style=flat-square&logo=virustotal)](https://www.virustotal.com/gui/file/f3c788a5cfa2a01b67edd6af451ee6748944818f20b7d51203ecf5cf8d4c837b?nocache=1)
```
