# Telegram channel — preparation only

No bot, account, token, message or integration has been created or activated by this repository.

## Before activation
- Verify approved Ubuntu host and install OpenClaw under a dedicated non-root account.
- Choose a single owner-controlled Telegram bot identity through Telegram's official BotFather interface.
- Store its bot token only in the host's protected secret store or restricted service environment, **never** in GitHub, screenshots or chat.
- Configure the Telegram channel according to the installed OpenClaw version's official documentation; review exact schema at activation time.
- Set DM access to pairing/owner-only. Do not enable unrestricted group access.
- Confirm that the gateway dashboard is reachable only via localhost/SSH tunnel/private network.
- Test inbound message, outbound reply and owner-only denial with a non-sensitive test conversation.
- Leave WhatsApp, Signal, Manus and additional agent access disabled until individually reviewed.

## Acceptance criteria
1. The gateway reports healthy and is not exposed to the public internet.
2. Only the owner's paired Telegram identity can command the assistant.
3. Sending external messages or changing production remains approval-gated.
4. Restart and recovery work without manual re-entering secrets into a shell history.
5. Secrets and private user messages are absent from GitHub logs and commits.
