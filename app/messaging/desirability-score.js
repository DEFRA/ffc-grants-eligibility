const cache = require('../cache')

module.exports = async function (msg, desirabilityScoreReceiver) {
  try {
    const { body: desirabilityScoreMsg, correlationId } = msg

    await cache.setDesirabilityScore(correlationId, desirabilityScoreMsg)
    await desirabilityScoreReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    await desirabilityScoreReceiver.abandonMessage(msg)
  }
}
