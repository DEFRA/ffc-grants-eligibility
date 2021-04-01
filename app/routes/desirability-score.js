const cache = require('../cache')
const { desirabilityInputQuestionMapping: questionMapping } = require('../content-mapping')

module.exports = {
  method: 'GET',
  path: '/desirability-score',
  handler: async (request, h) => {
    const { correlationId: key } = request.query

    if (key) {
      const desirabilityScore = await cache.getDesirabilityScore(key)

      if (desirabilityScore) {
        Object.assign(desirabilityScore, { questionMapping })
        return h.response(desirabilityScore).code(200)
      }

      return h.response(`value for ${key} not in cache, try later`).code(202)
    }

    return h.response('missing correlationId parameter').code(400)
  }
}
