# KYM CORE / OpenClaw bootstrap

**Status:** source-controlled preparation only. Nothing in this directory deploys or starts OpenClaw automatically.

This work is isolated from the existing KYM TIME application and production website. No existing Cloudflare settings, website code, DNS, or infrastructure are changed.

## First milestone
1. Verify which Ubuntu/Vultr instance currently exists and who administers it. A historic IP address is not proof of a live machine.
2. Create a dedicated non-root OS user and private runtime, with recovery access and backups.
3. Install OpenClaw using its **official** instructions: https://docs.openclaw.ai/install
4. Run `openclaw onboard` interactively on the approved host. Configure an approved AI provider. Do not paste tokens into GitHub or chat.
5. Install the gateway background service if onboarding did not already install it: `openclaw gateway install`.
6. Verify with `openclaw --version`, `openclaw doctor`, and `openclaw gateway status`.
7. Configure Telegram using official channel instructions. Use private pairing/allowlist and test with a single owner account.
8. Keep the control dashboard bound to localhost; remote access only via SSH tunnel or an authenticated private network. Do not open the gateway port to the internet.

## Separation of concerns
- Existing website: unchanged.
- OpenClaw gateway: a separately managed long-running service, **not** a static web application.
- GitHub: stores reviewed code and documentation; GitHub connector access does **not** imply SSH/Vultr access.
- Agents: start with one restricted assistant. Introduce separate Atlas, Sanglung, and technical agents only after permissions and data boundaries are reviewed.
- No unapproved outbound messages, spending, publication, server changes, banking/crypto transactions, or personal data sharing.

## Next engineering step
After host verification, create a reviewed deployment mechanism (e.g. restricted SSH deploy user and protected GitHub Actions environment). Do not store private keys, API credentials or tokens in this repository. Do not run deployment from this branch without owner approval.

Official documentation: https://docs.openclaw.ai/ and https://docs.openclaw.ai/docker
