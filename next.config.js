/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
})
const nextConfig = withPWA({
  images: {
    domains: ['images.unsplash.com', 'unsplash.com', 'localhost', 'firebasestorage.googleapis.com']


  },
  async headers() {
    return [
      {
        source: '/components/products',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store'
          },

        ],
      },
    ]
  },

})

module.exports = nextConfig
