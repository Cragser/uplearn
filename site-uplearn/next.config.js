/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ANKI_API_URL: process.env.ANKI_API_URL,
    DOCKER_ENVIRONMENT: process.env.DOCKER_ENVIRONMENT,
    MOODLE_API_TOKEN: process.env.MOODLE_API_TOKEN,
    MOODLE_API_URL: process.env.MOODLE_API_URL,
    SENTRY_DSN: process.env.SENTRY_DSN ,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN ,
  },
};

module.exports = nextConfig;

// Injected content via Sentry wizard below
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  org: "sergio-reyes",

  project: "javascript-nextjs",

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
});
