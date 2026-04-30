export interface PostHogAnalyticsConfig {
  enabled: boolean;
  projectToken: string;
  apiHost: string;
  captureOnLocalhost: boolean;
  sessionReplaySampleRate: number;
}

const projectToken = '';
const apiHost = 'https://us.i.posthog.com';

export const posthogAnalyticsConfig: PostHogAnalyticsConfig = {
  // PostHog project tokens are public identifiers, not backend secrets.
  enabled: projectToken.length > 0,
  projectToken,
  apiHost,
  captureOnLocalhost: false,
  sessionReplaySampleRate: 0.05
};
