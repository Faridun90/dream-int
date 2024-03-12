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
  webpack: (config) => {
   config.externals = [...config.externals, 'bcrypt'];
   return config;
},
};

export default nextConfig;
