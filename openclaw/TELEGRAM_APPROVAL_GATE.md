# KYM CORE Telegram approval gate (development only)

The adjacent JSON file is a **planning manifest, not OpenClaw runtime configuration**.
It is deliberately disabled and contains no chat IDs, user IDs, tokens, or credentials.
The validator rejects enabling Telegram in the example, even if a future owner approves it;
a separate reviewed runtime configuration must be created after approval.

## Prerequisites before enabling a bot
1. Verify the replacement Ubuntu host, dedicated non-root runtime identity, backup and rollback.
2. Record explicit owner approval for Telegram connection, permitted account, agent, and message scope.
3. Check the installed OpenClaw version and current official Telegram channel schema; do not assume the fields in this planning manifest are OpenClaw settings.
4. Create the bot/token through an owner-controlled channel; store credentials only in the approved runtime secret store, never in GitHub, chat, or logs.
5. Restrict DM access using pairing and explicit owner ID allowlisting after identity verification; disable groups by default.
6. Keep all external sends, purchases, publication, and privileged tool actions subject to separate approval. Telegram pairing alone does not authorize actions.
7. Bind gateway/control UI to loopback and use SSH tunnel/private authenticated networking; do not publish an unauthenticated webhook or dashboard.
8. Test first with harmless inbound messages and an owner-approved reply. Check logs for token and message-content leakage, then document a disable/revoke procedure.

## Current gate
**BLOCKED:** No verified live Ubuntu host, no runtime installation, no owner-approved Telegram pairing, and no runtime secret provisioning. No messaging connection or deployment is authorized.

## Offline checks
Run `python3 -m unittest discover -s openclaw/tests -v` and
`python3 openclaw/tools/verify_telegram_policy.py openclaw/examples/telegram-access.example.json`.
These only validate source-controlled planning files; they cannot prove runtime isolation.
