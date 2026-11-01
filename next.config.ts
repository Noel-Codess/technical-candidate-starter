import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The SDK loads its bundled persona JSON with import.meta.url at runtime.
  // Keep it as a native Node module instead of rewriting that URL in the bundle.
  serverExternalPackages: ["ai-persona-sdk"],
};

export default nextConfig;
