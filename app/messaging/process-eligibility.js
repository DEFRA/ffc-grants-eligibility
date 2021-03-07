module.exports = async function (msg, eligibilityAnswersReceiver) {
  try {
    const { body } = msg
    console.log('Received eligilibilty answers message:')
    console.log(body)
    await eligibilityAnswersReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    await eligibilityAnswersReceiver.abandonMessage(msg)
  }
}
