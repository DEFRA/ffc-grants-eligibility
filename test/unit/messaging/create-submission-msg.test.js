describe('Create desirability message', () => {
  const createMsg = require('../../../app/messaging/create-submission-msg')
  const agentSubmission = require('./submission-agent.json')
  const farmerSubmission = require('./submission-farmer.json')
  const desirabilityScore = require('./desirability-score.json')

  test('Farmer submission generates correct message payload', () => {
    const msg = createMsg(farmerSubmission, desirabilityScore)

    expect(msg.applicantEmail.emailAddress).toBe(farmerSubmission.farmerContactDetails.email)
  })

  test('Agent submission generates correct message payload', () => {
    const msg = createMsg(agentSubmission, desirabilityScore)

    expect(msg.applicantEmail.emailAddress).toBe(agentSubmission.agentContactDetails.email)
  })
})
