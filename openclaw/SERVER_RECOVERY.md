# Server recovery record — 2026-11-08

## Verified history
The original GitHub repository has a manual SSH test at
`.github/workflows/kymcore-ssh-test.yml` on main. It uses an encrypted
`KYMCORE_SSH_KEY` and connects to `kymdeploy` at a historical hardcoded IP.
**Do not run that workflow against a new host or assume its old key is valid.**

The owner's November 2026 Vultr screenshot showed no instances in the
account at that moment. No replacement Ubuntu instance or server terminal
access has been verified. Prior documentation of successful SSH setup
describes historical work, not a current running server.

## Recovery sequence
1. Owner approves an instance configuration and cost in the 90nize account.
2. Owner provisions a new Ubuntu instance (no automatic spending).
3. Verify new instance ID, IP, OS, fingerprint, ownership and recovery console.
4. Set up non-root deploy identity and SSH key on the new host; rotate old keys
   as appropriate, without disclosing private material in chat or commits.
5. Create a **new** manual read-only SSH test using verified host key pinning.
   Never use StrictHostKeyChecking=accept-new for unattended deployment.
6. Run read-only preflight, review backups/firewall and isolate gateway service.
7. Obtain separate approval before installing or activating OpenClaw.

## Public website
KYM TIME and kymnoir.com remain on their existing hosting. No DNS,
Cloudflare or production application changes are required for server recovery.
