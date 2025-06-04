/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
    ignoreDuringBuilds: true,
  },
    images: {
    domains: [
      "lknodatkjlzfqcqveheb.supabase.co",
    ],
  },
};

export default nextConfig;
