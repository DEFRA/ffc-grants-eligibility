module.exports = async function (msg, desirabilityScoreReceiver) {
  try {
    const { body } = msg
    console.log('Received desirability score message:')
    console.log(body)
    await desirabilityScoreReceiver.completeMessage(msg)
  } catch (err) {
    console.err('Unable to process message')
    console.err(err)
    await desirabilityScoreReceiver.abandonMessage(msg)
  }
}
