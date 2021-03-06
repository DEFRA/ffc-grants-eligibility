const { calculateScore } = require('./senders')

module.exports = async function (msg, projectDetailsReceiver) {
  try {
    const { body } = msg
    console.log('Received project details message:')
    console.log(body)

    await calculateScore({ test: 'Calculate the desirability' })

    await projectDetailsReceiver.completeMessage(msg)
  } catch (err) {
    console.err('Unable to process message')
    console.err(err)
    await projectDetailsReceiver.abandonMessage(msg)
  }
}
