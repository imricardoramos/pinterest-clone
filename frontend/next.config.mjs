const nextConfig = {
  /* config options here */
  trailingSlash: true,
  images: {
    domains: [
      "localhost",
      "altpins.ricardoramos.localhost",
      "pinterest-backend",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/:path*/",
      },
    ];
  },
};

export default nextConfig;
