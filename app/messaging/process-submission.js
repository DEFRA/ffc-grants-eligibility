const { sendDesirabilitySubmitted } = require('./senders')
const cache = require('../cache')
const createMsg = require('./create-submission-msg')

module.exports = async function (msg, contactDetailsReceiver) {
  try {
    const { body: submissionDetails, correlationId } = msg
    // const { body: submissionDetails } = msg
    console.log(submissionDetails)

    // FIXME: this is just for testing
    // const correlationId = 'paul-test-123'

    // Get details from cache regarding desirability score
    const desirabilityScore = await cache.getDesirabilityScore(correlationId)
    const msgOut = createMsg(submissionDetails, desirabilityScore)

    // console.log(JSON.stringify(msgOut, null, 2))

    await sendDesirabilitySubmitted(msgOut, correlationId)

    await contactDetailsReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    await contactDetailsReceiver.abandonMessage(msg)
  }
}
