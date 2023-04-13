/** @type {import("next").NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n.js");

const nextConfig = withNextIntl({
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.googleapis.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
});

module.exports = nextConfig;
