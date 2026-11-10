/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  turbopack: {},
  allowedDevOrigins: ['linuxmint.local'],
  //output: 'export'
};
export default nextConfig;
