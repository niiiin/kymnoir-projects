# Pumpkin Your Day — public preview

A responsive, static first preview for the Pumpkin Your Day companion app.

- Path in this repository: `pumpkin/index.html`
- Planned live URL: `https://kymcore.online/pumpkin/`
- Hosting: existing Nginx instance on the separate KYM CORE Amsterdam Ubuntu VPS.
- Design: warm, friendly, orange/cream and accessible on phone and desktop.
- Functional demo: eight activity categories, Surprise Me, local interactive adaptive 2-question flow.
- **Not yet** wired to OpenAI, a user database, external services, accounts, voice chat, monetization, or analytics.
- **Public preview**: no private data, credentials, copyrighted assets, or secret API keys are contained here. Do not enter personal information in the demonstration chat.
- Brand working title: Pumpkin Your Day. Character: Pumpkin. Tagline: "Together, we make your day. 🌞" Send icon: a pumpkin.

## Deploy with Termius

From a root shell on the KYM CORE Amsterdam server:

```bash
sudo mkdir -p /var/www/html/pumpkin &&
sudo curl -fLSs --retry 3 \
  'https://raw.githubusercontent.com/niiiin/kymnoir-projects/refs/heads/feature/pumpkin-app-bootstrap/pumpkin/index.html' \
  -o /var/www/html/pumpkin/index.html
```

Once copied, browse to `https://kymcore.online/pumpkin/`. This command does not modify the existing `/var/www/html/index.html` KYM CORE landing page and does not touch `kymnoir.com`.

## Next engineering milestones

1. Set up repeatable deployment and server-side GitHub authentication (read-only deploy key; never embed tokens in web content).
2. Extract static UI into a React Native + Expo mobile app, with an equivalent web experience.
3. Create a TypeScript API service for Pumpkin's *real* dynamic question engine; route LLM requests through server-side secret management, never browser-embedded API keys.
4. Add consent-based per-user memory, data privacy controls, age-appropriate safety design and optional geolocated recommendations.
5. Before private beta: authentication, HTTPS checks, access controls, monitoring, rate limits and a secure staging environment.

This branch intentionally avoids changes to the default-branch website.