describe('desirability-score route test', () => {
  const server = require('../../../../app/server')
  const cache = require('../../../../app/cache')
  const { desirabilityInputQuestionMapping: questionMapping } = require('../../../../app/content-mapping')

  const testKey = 'testKey'
  const testValue = { test: 'testValue' }
  const options = {
    method: 'GET',
    url: `/desirability-score?correlationId=${testKey}`
  }

  beforeAll(() => {
    cache.initialise(server)
  })

  beforeEach(async () => {
    await server.start()
  })

  test('GET /desirability-score route returns 400 with no query correlationId parameter', async () => {
    const options = {
      method: 'GET',
      url: '/desirability-score'
    }
    const response = await server.inject(options)
    expect(response.payload).toEqual('missing correlationId parameter')
    expect(response.statusCode).toBe(400)
  })

  test('GET /desirability-score route returns 202 with no cache entry for correlationId parameter', async () => {
    const response = await server.inject(options)
    expect(response.payload).toEqual(`value for ${testKey} not in cache, try later`)
    expect(response.statusCode).toBe(202)
  })

  test('GET /desirability-score route returns 200 with cache entry for correlationId parameter', async () => {
    await cache.setDesirabilityScore(testKey, testValue)

    const response = await server.inject(options)
    const payload = JSON.parse(response.payload)
    expect(payload).toEqual(expect.objectContaining(testValue))
    expect(payload).toEqual(expect.objectContaining({ questionMapping }))
    expect(response.statusCode).toBe(200)
  })

  afterEach(async () => {
    await server.stop()
  })
})
