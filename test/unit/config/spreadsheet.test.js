describe('Spreadsheet config', () => {
  // Credit where credit is due: https://stackoverflow.com/questions/48033841/test-process-env-with-jest
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  test('Valid env vars pass validation and are set', () => {
    const mockPwd = 'mock-pwd'
    process.env.WORKSHEET_PROTECT_PASSWORD = mockPwd
    process.env.WORKSHEET_HIDE_EMPTY_ROWS = 'true'
    process.env.WORKSHEET_PROTECT_ENABLED = 'true'
    process.env.SEND_EMAIL_TO_RPA = 'true'
    const spreadsheetConfig = require('../../../app/config/spreadsheet')

    expect(spreadsheetConfig.hideEmptyRows).toBe(true)
    expect(spreadsheetConfig.protectEnabled).toBe(true)
    expect(spreadsheetConfig.sendEmailToRpa).toBe(true)
    expect(spreadsheetConfig.protectPassword).toBe(mockPwd)
  })

  test('Non boolean hide empty rows throws error', () => {
    process.env.WORKSHEET_HIDE_EMPTY_ROWS = 'mock-string'
    expect(() => require('../../../app/config/spreadsheet')).toThrow()
  })

  test('Non boolean worksheet protect enabled throws error', () => {
    process.env.WORKSHEET_PROTECT_ENABLED = 'mock-string'
    expect(() => require('../../../app/config/spreadsheet')).toThrow()
  })

  test('Non boolean sendEmailToRpa throws error', () => {
    process.env.SEND_EMAIL_TO_RPA = 'mock-string'
    expect(() => require('../../../app/config/spreadsheet')).toThrow()
  })

  test('No sendEmailToRpa enabled defaults to false', () => {
    process.env.SEND_EMAIL_TO_RPA = undefined
    const spreadsheetConfig = require('../../../app/config/spreadsheet')
    expect(spreadsheetConfig.sendEmailToRpa).toBe(false)
  })

  test('No hide empty rows defaults to false', () => {
    process.env.SEND_EMAIL_TO_RPA = undefined
    process.env.WORKSHEET_HIDE_EMPTY_ROWS = undefined
    const spreadsheetConfig = require('../../../app/config/spreadsheet')
    expect(spreadsheetConfig.hideEmptyRows).toBe(false)
  })

  test('No worksheet protect enabled defaults to false', () => {
    process.env.SEND_EMAIL_TO_RPA = undefined
    process.env.WORKSHEET_PROTECT_ENABLED = undefined
    const spreadsheetConfig = require('../../../app/config/spreadsheet')
    expect(spreadsheetConfig.protectEnabled).toBe(false)
  })

  
})
