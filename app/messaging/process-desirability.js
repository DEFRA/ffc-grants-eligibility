const { sendCalculateScore } = require('./senders')

module.exports = async function (msg, projectDetailsReceiver) {
  try {
    const { body } = msg
    console.log('Received project details message:')
    console.log(body)

    await sendCalculateScore({ test: 'Calculate the desirability' })

    await projectDetailsReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    await projectDetailsReceiver.abandonMessage(msg)
  }
}
