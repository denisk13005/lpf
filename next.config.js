/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,

})
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'unsplash.com', 'localhost', 'firebasestorage.googleapis.com', 'github.com']


  }
  ,
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

}

module.exports = withPWA(nextConfig)
