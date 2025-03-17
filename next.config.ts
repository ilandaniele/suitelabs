import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev.suitelabs.net",
      },
    ],
  },
};

export default nextConfig;
