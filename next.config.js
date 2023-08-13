/** @type {import('next').NextConfig} */
const nextConfig = { 
  experimental: {
    appDir: true,
  
  },
  images: {
    domains: ['images.unsplash.com','unsplash.com','localhost'],
    remotePatterns: [
      {

        hostname: ''
      }
    ],
    
},
  
}

module.exports = nextConfig
