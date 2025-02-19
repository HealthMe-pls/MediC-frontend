import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ["127.0.0.1:8080"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8080",
        pathname: "/upload/**",
        search: "",
      },
      {
        protocol: "http",
        hostname: "backend",
        port: "8080",
        pathname: "/upload/**",
      },
    ],
    localPatterns: [
      {
        pathname: "/public/assets/**",
        search: "",
      },
    ],
    // Add these options to help debug and potentially resolve the issue
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["127.0.0.1", "localhost"],
  },
  // Add this to help with debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
