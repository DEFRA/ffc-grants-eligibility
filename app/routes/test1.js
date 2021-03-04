const cache = require('../config/dummy-cache')

module.exports = {
  method: 'GET',
  path: '/test1',
  handler: (request, h) => {
    const { key } = request.query
    const value = cache.get(key)

    if (value) {
      return h.response({ value }).code(200)
    }

    return h.response('still processing').code(202)
  }
}
