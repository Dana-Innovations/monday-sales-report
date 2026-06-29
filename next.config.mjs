/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bundle the report shell + per-week data into the /report function
  outputFileTracingIncludes: {
    '/report': ['./index.html', './data/**/*'],
  },
};

export default nextConfig;
