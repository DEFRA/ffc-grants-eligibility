const { sendCalculateScore } = require('./senders')
const createMsg = require('./create-msg')

module.exports = async function (msg, projectDetailsReceiver) {
  try {
    const { body: desirabilityAnswers, correlationId } = msg

    // FIXME: tidy console log and add result to cache

    await sendCalculateScore(createMsg.desirability(desirabilityAnswers), correlationId)

    await projectDetailsReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    await projectDetailsReceiver.abandonMessage(msg)
  }
}
