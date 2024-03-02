/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.s3.amazonaws.com',
     
      },
    ],
  },
   webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: 'file-loader', // Use file-loader for image imports
      });
    }
    return config;
  }
};

export default nextConfig;
