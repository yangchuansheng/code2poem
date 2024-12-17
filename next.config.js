/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  transpilePackages: [
    '@radix-ui/react-progress',
    '@radix-ui/react-toast',
    '@radix-ui/react-dialog',
    '@radix-ui/react-alert-dialog',
  ],
};

module.exports = nextConfig;
