# KYM CORE gateway exposure review (non-production runbook)

Status: documentation only. No DNS, Nginx, Cloudflare, firewall, OpenClaw or production changes are performed by this file.

## Observed owner-provided host evidence (12 November 2026)

- On `kymcore-amsterdam`, OpenClaw CLI and gateway reported version `2026.11.3`.
- `openclaw gateway status` reported active/running and connectivity OK; listening on `127.0.0.1:18789`.
- `loginctl show-user kymcore -p Linger -p State` reported `Linger=yes` and `State=lingering`. This is not evidence of a reboot-survival test.
- The owner showed Nginx with a Certbot-managed HTTPS virtual host for `kymcore.online`. A filtered `nginx -T` output did not show `proxy_pass`. The full active HTTPS location block and OpenClaw authentication configuration have **not** been audited.
- These observations are screenshots, not live SSH access or independently executed tests. The GitHub branch does not install or operate the service.

## Default decision: do not publish the control dashboard

Prefer an SSH tunnel or authenticated private network for owner access. A public HTTPS endpoint, even with a valid certificate, is **not** sufficient protection for an agent control plane. Do not add a public reverse proxy until the owner explicitly approves the exposure model and the following checks pass.

### Read-only checks for an approved operator

Run locally on the host, **without pasting token values or private configuration into chat**:

```bash
sudo nginx -t
sudo nginx -T 2>&1 | grep -n -E 'server_name kymcore.online|proxy_pass|listen .*443|location /'
sudo ss -ltnp | grep -E ':(80|443|18789)\\b' || true
sudo -u kymcore env XDG_RUNTIME_DIR=/run/user/$(id -u kymcore) DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$(id -u kymcore)/bus /home/kymcore/.npm-global/bin/openclaw gateway status
```

Treat all command output as potentially sensitive; redact host addresses, paths, and identifiers as appropriate. **Never** print environment variables, credential files, tokens, or complete OpenClaw configuration. Check exact current OpenClaw documentation before interpreting authentication settings.

### Approval gate for any public reverse proxy

1. Confirm a current recovery path, backup, and rollback copy of the existing Nginx configuration.
2. Verify OpenClaw gateway remains loopback-only and port 18789 is blocked from external access (including IPv6).
3. Choose a private-access solution first. If public exposure is genuinely required, document an independent authentication layer, OpenClaw authentication, authorization boundaries, rate limits, and trusted proxy handling. Do not treat HTTP Basic Auth alone as sufficient for a privileged control plane.
4. Explicitly configure WebSocket upgrade forwarding and verify origin/host handling according to the installed OpenClaw release.
5. Check that no unauthenticated route, dashboard endpoint, pairing endpoint, or WebSocket handshake bypasses access control.
6. Use `nginx -t` before a separately approved reload; maintain a rollback command and a second administrative session.
7. Test from an untrusted network for denied access before testing authorized access; verify no secrets appear in access/error logs.
8. Keep Telegram disabled until owner-approved bot setup, private pairing, and sender allowlist are independently tested. Never place bot tokens in GitHub.

## Agent isolation and change authority

- Begin with one restricted agent under dedicated `kymcore` OS identity, not root.
- Separate Atlas, Sanglung and personal assistant workspaces, credentials and permissions; no shared unrestricted file mounts.
- No autonomous spending, external publication, production deployment, outbound private messages, banking/crypto actions, or secrets access without explicit owner authorization.
- GitHub commits are **source preparation**, not proof of installation, running services, or security validation.

## Exit criteria

An owner-approved access design, documented rollback, independent authentication tests, and explicit authorization to deploy are required before connecting `kymcore.online` to the gateway. Until then, leave Nginx and the live gateway untouched.
