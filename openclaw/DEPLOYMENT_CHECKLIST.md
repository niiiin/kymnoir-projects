# KYM CORE OpenClaw deployment checklist

## Already done
- [x] GitHub connector read/write verified for `niiiin/kymnoir-projects`
- [x] Separate feature branch created
- [x] Bootstrap documentation and safety policy prepared

## Requires verification
- [ ] Live Ubuntu host identified in authorized 90nize Vultr account
- [ ] Server size, OS, uptime, backup and billing status confirmed
- [ ] Safe non-root deployment path established
- [ ] Existing website deployments mapped; no changes to production
- [ ] Firewall, recovery console and rollback plan reviewed

## Requires explicit activation
- [ ] OpenClaw installed on approved host
- [ ] Gateway bound privately and verified healthy
- [ ] Model credentials configured through secure secret management
- [ ] Telegram bot created and owner pairing approved
- [ ] Telegram test message answered
- [ ] Optional Grok provider configured
- [ ] WhatsApp/Signal/Manus integrations reviewed separately

## Stop conditions
Stop if host ownership is unclear, production services might be affected, secrets would be exposed, a new charge is required, or an agent would receive broad permissions without explicit approval.
