describe('Cache test', () => {
  const server = require('../../../../app/server')
  const cache = require('../../../../app/cache')

  beforeAll(() => {
    cache.initialise(server)
  })

  beforeEach(async () => {
    await server.start()
  })

  test('initialise cache more than once throws an error', () => {
    expect(() => cache.initialise(server)).toThrow()
  })

  test('set and retrieve value from desirability score cache', async () => {
    const key = 'testKey'
    const setValue = 'testValue'
    await cache.setDesirabilityScore(key, setValue)
    const getValue = await cache.getDesirabilityScore(key)

    expect(getValue).toEqual(setValue)
  })

  afterEach(async () => {
    await server.stop()
  })
})
