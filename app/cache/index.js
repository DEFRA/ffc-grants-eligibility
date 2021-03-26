const cacheConfig = require('../config/cache')
let desirabilityScoreCache

module.exports = {
  initialise: (server) => {
    desirabilityScoreCache = server.cache({
      expiresIn: cacheConfig.desirabilityScoresSegment.expiresIn,
      segment: cacheConfig.desirabilityScoresSegment.name
    })
  },
  setDesirabilityScore: (key, value) => desirabilityScoreCache.set(key, value),
  getDesirabilityScore: key => desirabilityScoreCache.get(key),
  removeDesirabilityScore: key => desirabilityScoreCache.drop(key)
}
