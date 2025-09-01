import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BASE_URL: "https://swapi.py4e.com/api/",
    CHARACTERS_ROUTE: "people",
  },
  images: {
    domains: ["vieraboschkova.github.io"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
