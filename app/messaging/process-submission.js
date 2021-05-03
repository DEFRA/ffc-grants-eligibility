const { sendDesirabilitySubmitted } = require('./senders')
const cache = require('../cache')
const createMsg = require('./create-submission-msg')
const appInsights = require('applicationinsights')

module.exports = async function (msg, contactDetailsReceiver) {
  try {
    const { body: submissionDetails, correlationId } = msg

    // Get details from cache regarding desirability score
    const desirabilityScore = await cache.getDesirabilityScore(correlationId)
    const msgOut = createMsg(submissionDetails, desirabilityScore)

    await sendDesirabilitySubmitted(msgOut, correlationId)

    await contactDetailsReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    appInsights.trackException(err)
    await contactDetailsReceiver.abandonMessage(msg)
  }
}
