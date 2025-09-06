/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    // Enable resolving the tsconfig "paths" mapping (for @/* alias)
    tsconfigPaths: true,
  },
};

export default config;
