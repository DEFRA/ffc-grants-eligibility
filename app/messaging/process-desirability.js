const { sendCalculateScore } = require('./senders')
const createMsg = require('./create-msg')
const cache = require('../cache')

module.exports = async function (msg, projectDetailsReceiver) {
  try {
    const { body: desirabilityAnswers, correlationId } = msg

    // Remove any previous cache entries with the given correlationId
    // For simplicity we will recalculate every time
    await cache.removeDesirabilityScore(correlationId)

    const desirabilityMsg = createMsg.desirability(desirabilityAnswers)
    await sendCalculateScore(desirabilityMsg, correlationId)

    await projectDetailsReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    await projectDetailsReceiver.abandonMessage(msg)
  }
}
