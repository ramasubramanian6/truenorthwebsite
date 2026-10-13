import path from "node:path";
import type { NextConfig } from "next";

// Static export: the site is plain files, so it can sit on Vercel, S3 or any
// static host. Every dynamic route therefore needs generateStaticParams.
const nextConfig: NextConfig = {
  // The website sits inside the True North repository; keep Next from treating the
  // repository (or a parent folder) as its workspace root.
  turbopack: { root: path.join(__dirname) },
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
