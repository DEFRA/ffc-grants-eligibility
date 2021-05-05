const { sendCalculateScore } = require('./senders')
const createMsg = require('./create-desirability-msg')
const cache = require('../cache')
const appInsights = require('../services/app-insights')
module.exports = async function (msg, projectDetailsReceiver) {
  try {
    const { body: desirabilityAnswers, correlationId } = msg
    console.log(desirabilityAnswers)

    // Remove any previous cache entries with the given correlationId
    // For simplicity we will recalculate every time
    await cache.removeDesirabilityScore(correlationId)

    const desirabilityMsg = createMsg(desirabilityAnswers)
    console.log(JSON.stringify(desirabilityMsg, null, 2))
    await sendCalculateScore(desirabilityMsg, correlationId)

    await projectDetailsReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    appInsights.logException(err, msg?.correlationId)
    await projectDetailsReceiver.abandonMessage(msg)
  }
}
