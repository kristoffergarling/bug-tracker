const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = () => {
  return {
    reactStrictMode: true,
    env: {
      FRONTEND_URI: "http://localhost:3000",
      BACKEND_URI: "https://bug-tracker-backend.onrender.com",
    },
  };
};

module.exports = nextConfig;
