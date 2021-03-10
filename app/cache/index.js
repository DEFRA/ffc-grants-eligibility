let myCache

module.exports = {
  initialise: (server) => (myCache = server.cache({
    expiresIn: 3600 * 1000, // 1 hour
    segment: 'test-segment'
  })),
  set: async (key, value) => await myCache.set(key, value),
  get: async (key) => await myCache.get(key)
}
