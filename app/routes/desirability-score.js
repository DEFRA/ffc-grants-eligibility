const cache = require('../cache')

module.exports = {
  method: 'GET',
  path: '/desirability-score',
  handler: async (request, h) => {
    const { correlationId: key } = request.query

    if (key) {
      const value = await cache.getDesirabilityScore(key)

      if (value) {
        return h.response({ value }).code(200)
      }

      return h.response(`value for ${key} not in cache, try later`).code(202)
    }

    return h.response('missing correlationId parameter').code(400)
  }
}
