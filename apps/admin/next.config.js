// Importing env files here to validate on build
import "./src/env.js";
import "@streetcrisis/auth/env";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@streetcrisis/api",
    "@streetcrisis/auth",
    "@streetcrisis/db",
    "@streetcrisis/ui",
    "@streetcrisis/validators",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
