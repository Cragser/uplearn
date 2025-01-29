/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ANKI_API_URL: process.env.ANKI_API_URL,
    DOCKER_ENVIRONMENT: process.env.DOCKER_ENVIRONMENT,
    MOODLE_API_URL: process.env.MOODLE_API_URL,
    MOODLE_API_TOKEN: process.env.MOODLE_API_TOKEN,
  }
};

module.exports = nextConfig;
