/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily disable type checking during build to isolate the issue
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig