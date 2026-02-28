/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Remove 'output: export' for dev; enable it only for static builds:
  // output: 'export',
}

export default nextConfig
