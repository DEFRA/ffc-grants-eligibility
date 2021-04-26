describe('Create desirability message', () => {
  const createMsg = require('../../../app/messaging/create-submission-msg')
  const desirabilityScore = require('./desirability-score.json')

  beforeEach(() => {
    jest.resetModules()
  })

  test('Farmer submission generates correct message payload', () => {
    const farmerSubmission = require('./submission-farmer.json')
    const msg = createMsg(farmerSubmission, desirabilityScore)

    // FIXME put some more expects in here
    expect(msg.applicantEmail.emailAddress).toBe(farmerSubmission.farmerContactDetails.email)
  })

  test('Agent submission generates correct message payload', () => {
    const agentSubmission = require('./submission-agent.json')
    const msg = createMsg(agentSubmission, desirabilityScore)

    // FIXME put some more expects in here
    expect(msg.applicantEmail.emailAddress).toBe(agentSubmission.agentContactDetails.email)
  })

  test('Unknown farming type produces error string', () => {
    const farmerSubmission = require('./submission-farmer.json')
    farmerSubmission.farmingType = 'bad value'
    const msg = createMsg(farmerSubmission, desirabilityScore)

    expect(msg.spreadsheet.worksheets[0].rows.find(r => r.row === 53).values[2]).toBe('Error: failed to map farming type')
  })

  test('Under 10 employees results in micro business definition', () => {
    const farmerSubmission = require('./submission-farmer.json')
    farmerSubmission.businessDetails.numberEmployees = 1
    farmerSubmission.businessDetails.businessTurnover = 1
    const msg = createMsg(farmerSubmission, desirabilityScore)

    expect(msg.spreadsheet.worksheets[0].rows.find(r => r.row === 20).values[2]).toBe('Micro')
  })

  test('Under 50 employees results in small business definition', () => {
    const farmerSubmission = require('./submission-farmer.json')
    farmerSubmission.businessDetails.numberEmployees = 10
    farmerSubmission.businessDetails.businessTurnover = 1
    const msg = createMsg(farmerSubmission, desirabilityScore)

    expect(msg.spreadsheet.worksheets[0].rows.find(r => r.row === 20).values[2]).toBe('Small')
  })

  test('Under 250 employees results in medium business definition', () => {
    const farmerSubmission = require('./submission-farmer.json')
    farmerSubmission.businessDetails.numberEmployees = 50
    farmerSubmission.businessDetails.businessTurnover = 1
    const msg = createMsg(farmerSubmission, desirabilityScore)

    expect(msg.spreadsheet.worksheets[0].rows.find(r => r.row === 20).values[2]).toBe('Medium')
  })

  test('Over 250 employees results in large business definition', () => {
    const farmerSubmission = require('./submission-farmer.json')
    farmerSubmission.businessDetails.numberEmployees = 250
    farmerSubmission.businessDetails.businessTurnover = 1
    const msg = createMsg(farmerSubmission, desirabilityScore)

    expect(msg.spreadsheet.worksheets[0].rows.find(r => r.row === 20).values[2]).toBe('Large')
  })
})
