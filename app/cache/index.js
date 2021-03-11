const cacheConfig = require('../config/cache')
let desirabilityScoreCache
let projectDetailsCache

module.exports = {
  initialise: (server) => {
    desirabilityScoreCache = server.cache({
      expiresIn: cacheConfig.desirabilityScoresSegment.expiresIn,
      segment: cacheConfig.desirabilityScoresSegment.name
    })
    projectDetailsCache = server.cache({
      expiresIn: cacheConfig.projectDetailsSegment.expiresIn,
      segment: cacheConfig.projectDetailsSegment.name
    })
  },
  setDesirabilityScore: (key, value) => desirabilityScoreCache.set(key, value),
  getDesirabilityScore: key => desirabilityScoreCache.get(key),
  setProjectDetails: (key, value) => projectDetailsCache.set(key, value),
  getProjectDetails: key => projectDetailsCache.get(key)
}
