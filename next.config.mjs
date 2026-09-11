import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const nextConfig = (phase) => ({
  output: 'export',
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : 'dist',
  reactStrictMode: false,
  devIndicators: false,
  images: {
    unoptimized: true,
  },
});

export default nextConfig;
