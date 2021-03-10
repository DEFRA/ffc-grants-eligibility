const Hapi = require('@hapi/hapi')
const catbox = require('@hapi/catbox-redis')
const cacheConfig = require('./config/cache')

const server = Hapi.server({
  port: process.env.PORT,
  cache: [{
    provider: {
      constructor: catbox,
      options: cacheConfig.catboxOptions
    }
  }]
})

const routes = [].concat(
  require('./routes/healthy'),
  require('./routes/healthz')
)

server.route(routes)

module.exports = server
