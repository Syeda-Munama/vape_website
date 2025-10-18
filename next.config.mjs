/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, 
    eslint: {
    ignoreDuringBuilds: true,
  },
    images: {
    domains: [
      // "lknodatkjlzfqcqveheb.supabase.co",
      "uesfuchngfwtgitvmtkg.supabase.co",
    ],
  },
};

export default nextConfig;
