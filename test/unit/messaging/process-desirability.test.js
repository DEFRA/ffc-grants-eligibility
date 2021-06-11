const mockPassword = 'mock-pwd'
jest.mock('../../../app/config/spreadsheet', () => ({
  hideEmptyRows: true,
  protectEnabled: true,
  sendEmailToRpa: true,
  protectPassword: mockPassword
}))
jest.mock('../../../app/services/app-insights')
const processDesirability = require('../../../app/messaging/process-desirability')
const cache = require('../../../app/cache')
cache.removeDesirabilityScore = jest.fn(async (_correlationId) => {})
const appInsights = require('../../../app/services/app-insights')
appInsights.logException = jest.fn((_err, _sessionId) => {})

const projectDetailsReceiver = {
  completeMessage: jest.fn(async (_message) => { return null }),
  abandonMessage: jest.fn(async (_message) => { return null })
}
afterEach(() => {
  jest.clearAllMocks()
})
describe('get processDesirability setup defined', () => {
  test('Should be defined', () => {
    expect(processDesirability).toBeDefined()
  })
  test('Should be called', () => {
    expect(processDesirability('', projectDetailsReceiver)).toBeDefined()
  })
  test('Should be called with no error', async () => {
    await expect(processDesirability('', projectDetailsReceiver)).resolves.not.toThrow()
    expect(cache.removeDesirabilityScore).toHaveBeenCalledTimes(1)
  })
  test('Should be called with error', async () => {
    await expect(processDesirability(null, projectDetailsReceiver)).rejected
    expect(appInsights.logException).toHaveBeenCalledTimes(1)
  })
})
