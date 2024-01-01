/** @type {import('next').NextConfig} */
const nextConfig = {
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

}

module.exports = nextConfig
