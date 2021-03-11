const Hapi = require('@hapi/hapi')
const cacheConfig = require('./config/cache')
const catbox = cacheConfig.useRedis ? require('@hapi/catbox-redis') : require('@hapi/catbox-memory')

const server = Hapi.server({
  port: process.env.PORT,
  cache: [{
    provider: {
      constructor: catbox,
      options: cacheConfig.redisCatboxOptions // FIXME: diff values for catbox memory
    }
  }]
})

const routes = [].concat(
  require('./routes/healthy'),
  require('./routes/healthz')
)

server.route(routes)

module.exports = server
