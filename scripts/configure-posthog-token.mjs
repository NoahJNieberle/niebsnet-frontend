import { readFileSync, writeFileSync } from 'node:fs';

const token = process.env.POSTHOG_PROJECT_TOKEN?.trim() ?? '';
const configUrl = new URL('../src/app/analytics/posthog.config.ts', import.meta.url);
const placeholder = "const projectToken = '';";

if (!token) {
  console.log('POSTHOG_PROJECT_TOKEN is not set; analytics will remain disabled.');
  process.exit(0);
}

const source = readFileSync(configUrl, 'utf8');
const escapedToken = token.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const updated = source.replace(placeholder, `const projectToken = '${escapedToken}';`);

if (updated === source) {
  throw new Error('Unable to find the PostHog project token placeholder.');
}

writeFileSync(configUrl, updated);
console.log('Configured PostHog analytics token for this build.');
