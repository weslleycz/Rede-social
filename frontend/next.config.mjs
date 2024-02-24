/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_Url: "http://api.dev.local",
      },
      typescript: {
        ignoreBuildErrors: true,
      },
};

export default nextConfig;
