const path = require('path')

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    config.node = {
      fs: 'empty'
    }
    config.resolve.alias['~'] = path.join(__dirname, '.')
    return config
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'https://pinterest-clone.portfolio.ricardoramos.me/api',
    // BACKEND_URL_INTERNAL: process.env.BACKEND_URL_INTERNAL || 'http://localhost:8001'
  }
}
