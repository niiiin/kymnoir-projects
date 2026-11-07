# Hosting decision — 2026-11-07

## Keep KYM TIME on Cloudflare for now
KYM TIME and other public web projects have an established deployment history. Do not migrate them as a prerequisite for OpenClaw. First inventory Cloudflare Pages/Workers configuration, domains, storage usage and actual costs. Moving a working site to a VPS adds operations and uptime obligations without necessarily reducing cost.

## OpenClaw on a separate private host
OpenClaw is a persistent agent gateway, not simply static HTML. Prefer a dedicated non-root user on a verified Ubuntu instance, with restricted network access and independent backups. Avoid putting the gateway on the public website's origin or sharing credentials.

## Before any deployment
- Confirm current 90nize Vultr instance exists and belongs to the owner.
- Verify resource capacity, costs, recovery access, firewall and backup.
- Run read-only `scripts/preflight.sh` on the verified host.
- Review official installation script, then install interactively.
- Keep Telegram private; use pairing/allowlist and explicit approvals for sending messages.

## Boundaries
No Cloudflare migration, DNS changes, production changes, new spending, new accounts or credential changes are authorized by this document.
