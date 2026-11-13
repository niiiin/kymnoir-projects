# Private dashboard access — owner runbook (proposal only)

**Scope:** OpenClaw on `kymcore-amsterdam`, observed listening at `127.0.0.1:18789` (owner screenshot, November 2026). This document does not change the server.

## Preferred access: SSH local forwarding, not public reverse proxy

Prerequisites: owner-approved SSH access to the verified host, an SSH client with local port forwarding, a working OpenClaw gateway, and a valid OpenClaw dashboard authentication/pairing method. Do not paste tokens, private keys, pairing codes, or authenticated dashboard URLs into GitHub or chat.

From a **trusted local computer** with SSH access, use a local-only tunnel:

```sh
ssh -N -L 127.0.0.1:18789:127.0.0.1:18789 kymcore@HOSTNAME_OR_IP
```

Replace the placeholder with the verified host. If local port 18789 is occupied, change only the **first** port (e.g. `127.0.0.1:18790:127.0.0.1:18789`) and browse to the corresponding local port. The tunnel ends when SSH disconnects. Open `http://127.0.0.1:18789/` **on the computer running SSH**, not on an unrelated phone/browser. For mobile Termius, verify that the SSH client supports device-local port forwarding before relying on this approach.

Do not change Nginx, Cloudflare, DNS, firewall, or OpenClaw binding to make this work. Do not use `-g`, `GatewayPorts yes`, `0.0.0.0` or public tunnel sharing. A tunnel protects transport but **does not replace OpenClaw's own authentication and authorization**.

## Read-only host checks (operator executes only with approval)

```sh
sudo nginx -t
sudo ss -ltnp | grep -E ':(18789|443|80)\\b' || true
sudo systemctl status nginx --no-pager
```

Expected: gateway listens on loopback only; nginx config passes; existing HTTPS stays unchanged. Avoid dumping full OpenClaw config or environment; outputs may contain identifying information. Check current installed-version documentation for control UI authentication, device pairing, and trusted proxy settings before attempting login.

## Security acceptance tests (no production changes)

1. **Local listener:** `ss` confirms gateway does not bind to `0.0.0.0`, `[::]`, or a public interface.
2. **Private access:** with tunnel active, browser can reach loopback UI on the same client; with tunnel closed, it cannot reach the remote gateway through that local port.
3. **Authentication:** an unpaired/unauthenticated client cannot operate the gateway; authorized client requires the intended pairing/authentication mechanism.
4. **Public access:** external clients cannot directly reach TCP 18789; no public Nginx `proxy_pass` to OpenClaw is enabled.
5. **Recovery:** SSH administrative access remains functional after ending the tunnel. No Nginx reload or gateway restart was needed.

## When public HTTPS is proposed later

Treat it as a separate change requiring explicit owner approval, independent access control, WebSocket/origin validation, rollback plan, and untrusted-network negative tests. See [GATEWAY-EXPOSURE-REVIEW.md](./GATEWAY-EXPOSURE-REVIEW.md). Do not assume that an existing TLS certificate makes the dashboard safe to publish.

## Telegram and agent isolation are separate gates

No bot token or private chat connection is required for this private dashboard test. Before Telegram: create an owner-approved bot through the official workflow, store its token only in the approved secret store, enforce allowlisted sender IDs and pairing, and test deny-by-default behavior. Separate Sanglung, Atlas, and personal agents by workspace, credentials, tools, and approval policies. None of those integrations is activated by this document.
