# NiebsNet Frontend

Public Angular portfolio frontend for NiebsNet.

## Development

```bash
npm ci
npm start
```

The local development server runs at `http://localhost:4200/`.

## Production Build

```bash
npm run build:prod
```

The production output is written to `dist/niebsnet/browser`.

## GitHub Pages

This repository includes a GitHub Actions workflow that builds the Angular app and deploys `dist/niebsnet/browser` to GitHub Pages.

## Analytics

PostHog support is wired through `src/app/analytics`. Tracking remains disabled unless a PostHog project token is injected during the build.

Tracked events include page views, project-card clicks, contact clicks, outbound project links, report downloads, project detail views, and Angular error-handler exceptions. Session replay is sampled at 5% and masks all form inputs.

For GitHub Pages, do not commit the PostHog token. Add it as a repository secret named `POSTHOG_PROJECT_TOKEN`; the deploy workflow injects it during the build. The token is still visible in the built browser JavaScript, which is expected for frontend analytics project tokens.

The default PostHog ingest host is `https://us.i.posthog.com`. If the PostHog project lives in another cloud region, set a repository variable or secret named `POSTHOG_API_HOST` to that project's ingest host before deploying.

See `docs/analytics-events.md` for the current event taxonomy.
