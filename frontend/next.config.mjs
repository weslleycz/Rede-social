/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_Url: "http://192.168.2.4:3001",
      },
      typescript: {
        ignoreBuildErrors: true,
      },
};

export default nextConfig;
