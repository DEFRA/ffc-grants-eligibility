const cache = require('../cache')
const appInsights = require('applicationinsights')

module.exports = async function (msg, desirabilityScoreReceiver) {
  try {
    const { body: desirabilityScoreMsg, correlationId } = msg

    await cache.setDesirabilityScore(correlationId, desirabilityScoreMsg)
    await desirabilityScoreReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    appInsights.trackException(err)
    await desirabilityScoreReceiver.abandonMessage(msg)
  }
}
