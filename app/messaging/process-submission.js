const { desirabilitySubmitted } = require('./senders')

module.exports = async function (msg, contactDetailsReceiver) {
  try {
    const { body } = msg
    console.log('Received contact details message:')
    console.log(body)

    await desirabilitySubmitted({ test: 'Process submission' })

    await contactDetailsReceiver.completeMessage(msg)
  } catch (err) {
    console.err('Unable to process message')
    console.err(err)
    await contactDetailsReceiver.abandonMessage(msg)
  }
}
