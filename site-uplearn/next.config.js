/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ANKI_API_URL: process.env.ANKI_API_URL,
    DOCKER_ENVIRONMENT: process.env.DOCKER_ENVIRONMENT
  }
};

module.exports = nextConfig;