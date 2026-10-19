import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Standalone output = smaller Docker image (copies only needed files)
  output: "standalone",
  // Keep tracing inside this lab folder (not parent DeployOS monorepo paths)
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
