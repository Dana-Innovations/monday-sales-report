/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure the report HTML (kept at repo root) is bundled into the /report function
  outputFileTracingIncludes: {
    '/report': ['./index.html'],
  },
};

export default nextConfig;
