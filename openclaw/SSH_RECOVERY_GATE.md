# SSH recovery gate — separate from website hosting

**State as of 9 November 2026:** Vultr Trust & Safety confirmed the prior account closure removed all instances and data. Later verification restored account access only. The owner-provided instance screenshot showed an empty list. The original host and its fingerprint must be treated as retired.

## What survived
- GitHub repository and the original manually triggered workflow `.github/workflows/kymcore-ssh-test.yml` on `main`.
- That workflow references the retired IP and a GitHub secret named `KYMCORE_SSH_KEY`. **Do not trigger it** until it has been reviewed and adapted to a verified new instance.
- The existence of the workflow does not prove that the old SSH key remains in GitHub Secrets, nor that any host is reachable.

## Safe recovery sequence
1. Owner approves a priced replacement server; no deployment or purchase is automated.
2. Verify its identity, current public IP, SSH host key fingerprint and OS in the Vultr console. Do not assume a recycled IP or old known_hosts entry is safe.
3. Establish console recovery, backup plan and a non-root `kymdeploy` account on the new instance; ensure key rotation rather than blindly reusing an old private key.
4. Copy `examples/ssh-target.example.json` outside the repository to a local private working file and populate non-secret metadata; validate with `python3 openclaw/tools/verify_ssh_target.py <file>`. The example intentionally fails validation.
5. Only after approval, prepare a new *manual* SSH smoke test with pinned known_hosts and a narrowly scoped GitHub environment secret. No `StrictHostKeyChecking=accept-new` for deployment.
6. Verify read-only login and collect sanitized host preflight results.
7. Separately approve installation of OpenClaw, its provider credentials and Telegram bot pairing.

## Architecture
- Cloudflare and KYM TIME remain untouched and independently hosted.
- OpenClaw gateway stays private on Ubuntu; no public dashboard or Telegram integration until explicitly authorized.
- Do not store any real credentials, private keys, API tokens or personal identity documents in this repository.

## Pass/fail boundary
An offline target check validates only metadata format and safety assertions. It cannot verify Vultr ownership, server existence, host key authenticity or SSH access.
