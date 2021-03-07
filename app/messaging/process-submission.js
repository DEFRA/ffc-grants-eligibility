const { sendDesirabilitySubmitted } = require('./senders')

module.exports = async function (msg, contactDetailsReceiver) {
  try {
    const { body } = msg
    console.log('Received contact details message:')
    console.log(body)

    await sendDesirabilitySubmitted({ test: 'Process submission' })

    await contactDetailsReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    await contactDetailsReceiver.abandonMessage(msg)
  }
}
