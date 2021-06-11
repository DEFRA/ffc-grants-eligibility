const mockPassword = 'mock-pwd'
jest.mock('../../../app/config/spreadsheet', () => ({
  hideEmptyRows: true,
  protectEnabled: true,
  sendEmailToRpa: true,
  protectPassword: mockPassword
}))
jest.mock('../../../app/cache')
jest.mock('../../../app/services/app-insights')
const desirabilityScore = require('../../../app/messaging/desirability-score')
const cache = require('../../../app/cache')
cache.setDesirabilityScore = jest.fn(async (_correlationId, _desirabilityScoreMsg) => {})
const appInsights = require('../../../app/services/app-insights')
appInsights.logException = jest.fn((_err, _sessionId) => {})
const desirabilityScoreReceiver = {
  completeMessage: jest.fn(async (_message) => { return null }),
  abandonMessage: jest.fn(async (_message) => { return null })
}
afterEach(() => {
  jest.clearAllMocks()
})
describe('get desirabilityScore setup defined', () => {
  test('Should be defined', () => {
    expect(desirabilityScore).toBeDefined()
  })
  test('Should be called', () => {
    expect(desirabilityScore('', desirabilityScoreReceiver)).toBeDefined()
  })

  test('Should be called with no error', async () => {
    await expect(desirabilityScore('', desirabilityScoreReceiver)).resolves.not.toThrow()
    expect(cache.setDesirabilityScore).toHaveBeenCalledTimes(1)
  })
  test('Should be called with error', async () => {
    await expect(desirabilityScore(null, desirabilityScoreReceiver)).rejected
    expect(appInsights.logException).toHaveBeenCalledTimes(1)
  })
})
