// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
});

// https://7dbe7b86d07ac59ddcd16125f4fbc958@o4508724280098816.ingest.us.sentry.io/4508724281737216
// Browser
//"https://7dbe7b86d07ac59ddcd16125f4fbc958@o4508724280098816.ingest.us.sentry.io/4508724281737216
// API
// https://7dbe7b86d07ac59ddcd16125f4fbc958@o4508724280098816.ingest.us.sentry.io/4508724281737216