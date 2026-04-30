import { readFileSync, writeFileSync } from 'node:fs';

const token = process.env.POSTHOG_PROJECT_TOKEN?.trim() ?? '';
const apiHost = process.env.POSTHOG_API_HOST?.trim() ?? '';
const configUrl = new URL('../src/app/analytics/posthog.config.ts', import.meta.url);
const tokenPlaceholder = "const projectToken = '';";
const apiHostPlaceholder = "const apiHost = 'https://us.i.posthog.com';";

const escapeLiteral = (value) => value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const normalizeApiHost = (value) => {
  if (!value) {
    return '';
  }

  const url = new URL(value);

  if (url.protocol !== 'https:') {
    throw new Error('POSTHOG_API_HOST must use HTTPS.');
  }

  url.pathname = '';
  url.search = '';
  url.hash = '';

  return url.toString().replace(/\/$/, '');
};

if (!token) {
  console.log('POSTHOG_PROJECT_TOKEN is not set; analytics will remain disabled.');
  process.exit(0);
}

const source = readFileSync(configUrl, 'utf8');
let updated = source.replace(tokenPlaceholder, `const projectToken = '${escapeLiteral(token)}';`);

if (updated === source) {
  throw new Error('Unable to find the PostHog project token placeholder.');
}

const normalizedApiHost = normalizeApiHost(apiHost);

if (normalizedApiHost) {
  const hostUpdated = updated.replace(apiHostPlaceholder, `const apiHost = '${escapeLiteral(normalizedApiHost)}';`);

  if (hostUpdated === updated) {
    throw new Error('Unable to find the PostHog API host placeholder.');
  }

  updated = hostUpdated;
}

writeFileSync(configUrl, updated);
console.log(`Configured PostHog analytics for this build using ${normalizedApiHost || 'the default API host'}.`);
