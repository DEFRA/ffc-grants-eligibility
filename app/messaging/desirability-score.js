const cache = require('../cache')
const appInsights = require('../services/app-insights')

module.exports = async function (msg, desirabilityScoreReceiver) {
  try {
    const { body: desirabilityScoreMsg, correlationId } = msg
    console.log(desirabilityScoreMsg)
    await cache.setDesirabilityScore(correlationId, desirabilityScoreMsg)
    await desirabilityScoreReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    appInsights.logException(err, msg?.correlationId)
    await desirabilityScoreReceiver.abandonMessage(msg)
  }
}
