import type { NextConfig } from "next";


const isProd = process.env.NODE_ENV === 'production';
const repoName = "portfolio"; // Change if your repo name is different

const nextConfig: NextConfig = {
  output: 'export',
  // For GitHub Pages, set basePath and assetPrefix
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  // If using images, add images.unoptimized: true
};

export default nextConfig;
