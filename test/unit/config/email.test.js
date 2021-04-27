describe('Email config', () => {
  // Credit where credit is due: https://stackoverflow.com/questions/48033841/test-process-env-with-jest
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  test('Notify template string passes validation', () => {
    const notifyTemplate = 'mock-string'
    process.env.NOTIFY_EMAIL_TEMPLATE = notifyTemplate

    const emailConfig = require('../../../app/config/email')
    expect(emailConfig.notifyTemplate).toBe(notifyTemplate)
  })

  test('No notify template throws error', () => {
    process.env.NOTIFY_EMAIL_TEMPLATE = undefined

    expect(() => require('../../../app/config/email')).toThrow()
  })
})
