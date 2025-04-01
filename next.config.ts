// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me", "fakestoreapi.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
};

export default nextConfig;
