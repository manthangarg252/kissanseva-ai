/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.thestatesman.com",
      },
      {
        protocol: "https",
        hostname: "geographicbook.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      }
    ],
  },
};
module.exports = {
  experimental: {
    serverActions: false,
    nextScriptWorkers: false,
  },
};

module.exports = nextConfig;
