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
async redirects() {
    return [
      { source: '/signin', destination: '/sign-in', permanent: true },
      { source: '/signup', destination: '/sign-up', permanent: true },
    ];
  },
};

export default nextConfig;
