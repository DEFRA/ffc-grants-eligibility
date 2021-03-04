const cache = require('../config/dummy-cache')

module.exports = async function (msg, testReceiver) {
  try {
    const source = msg.applicationProperties.source
    const { body } = msg

    console.log(`Received ${JSON.stringify(body)} from ${source}`)

    setTimeout(() => cache.set(body.key, `Eligibility service has value you want for ${body.key}`), 2000)

    await testReceiver.completeMessage(msg)
  } catch (err) {
    console.err('Unable to process update agreement message', err)
    await testReceiver.abandonMessage(msg)
  }
}
