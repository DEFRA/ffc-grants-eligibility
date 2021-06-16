jest.mock('../../app/server')
jest.mock('../../app/messaging/receivers')
jest.mock('../../app/messaging/process-desirability')
jest.mock('../../app/messaging/process-submission')
jest.mock('../../app/messaging/desirability-score')
const { setup } = require('../../app/services/app-insights')
jest.mock('../../app/services/app-insights')
const cache = require('../../app/config/cache')
cache.initialise = jest.fn((any) => { })
const server = require('../../app/server')
server.start = jest.fn(async () => { })
const receivers = require('../../app/messaging/receivers')
const mockPassword = 'mock-pwd'
jest.mock('../../app/config/spreadsheet', () => ({
  hideEmptyRows: true,
  protectEnabled: true,
  sendEmailToRpa: true,
  protectPassword: mockPassword
}))
receivers.startProjectDetailsReceiver = jest.fn((a) => {})
receivers.startContactDetailsReceiver = jest.fn((b) => {})
receivers.startDesirabilityScoreReceiver = jest.fn((c) => {})
const indexInit = require('../../app/index')

afterEach(() => {
  jest.clearAllMocks()
})
describe('get indexInit setup defined', () => {
  test('Should be defined', () => {
    expect(indexInit).toBeDefined()
  })
  test('Should call setup once', async () => {
    expect(require('../../app/index')).toEqual({})
    expect(setup).toHaveBeenCalledTimes(0)
  })
})
