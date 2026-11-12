# KYM NØIR Villa Giveaway · Deployment Checklist

Intended public link: https://kymnoir.com/giveaway
Terms: https://kymnoir.com/giveaway/terms.pdf

## Prepared
- Branded responsive landing page: `src/giveaway.js`
- Standalone static copy: `giveaway/index.html`
- Two-page downloadable PDF: `assets/giveaway/terms.pdf` and `giveaway/terms.pdf`
- Worker routes: `src/router.js`, `wrangler.toml`
- Rules preserve the words of the user-supplied PDF dated 12 November 2026. The web PDF is re-typeset to make it compact. Do not alter the terms without permission.
- No visitor data collection, payment, or signup.

## BLOCKER — giveaway video
No actual giveaway promo video was present in the current file upload. The only locally accessible .mp4 was an unrelated iPhone screen recording; it was NOT used.
The HTML displays a transparent placeholder until a genuine promo video file or approved direct MP4 URL is provided. The Cloudflare Worker supports an optional environment variable named `GIVEAWAY_VIDEO_URL` containing a fully qualified HTTPS .mp4 URL. It is not configured yet. Update the static HTML's placeholder if using static hosting.

## To publish to Cloudflare
1. Receive and inspect the correct promotional video.
2. Host the video at a public HTTPS URL (Cloudflare R2/Assets or another reliable authorized host); avoid storing large MP4 binaries inline in Worker scripts.
3. Set the video's URL as a Worker environment variable or replace the placeholder with a valid video source.
4. Merge the feature branch into the live deployment branch ONLY after reviewing the video and the legal terms.
5. Deploy the existing Worker `kymnoir-projects` with the updated `wrangler.toml` routes. Confirm which Cloudflare account owns the Worker and that its GitHub Builds/Actions connection is configured; simply committing to GitHub does not guarantee deployment.
6. Test GET /giveaway (200 text/html), GET /giveaway/terms.pdf (200 application/pdf, two pages), video playback on mobile, and Instagram link.
7. Copy the verified `https://kymnoir.com/giveaway` URL into the Instagram caption or bio.

## Event facts from uploaded PDF
- Opens 3 December 2026
- Closes 30 December 2026 at 23:59 WITA UTC+8
- Draw 31 December 2026 in @kym_noir Instagram Stories
- One winner plus one guest, 21+ only
- 3 nights private-pool villa, breakfasts, one private BBQ dinner, one hour spa treatment for two
- Flights, transfers, visas, insurance and other personal extras excluded
- No purchase necessary, Spotify follow optional and gives no extra entries
- Account warning: only @kym_noir contacts winners; never payments or credentials

DO NOT SHARE THE PUBLIC URL FOR THE INSTAGRAM POST BEFORE THE LIVE PAGE AND VIDEO HAVE BEEN VERIFIED.
