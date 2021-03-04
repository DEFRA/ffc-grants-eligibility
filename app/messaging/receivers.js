const msgCfg = require('../config/messaging')
const { MessageReceiver } = require('ffc-messaging')
const testReceiveAction = require('./test-receive-action')

let testReceiver

async function stop () {
  await testReceiver.closeConnection()
}

process.on('SIGTERM', async () => {
  await stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await stop()
  process.exit(0)
})

module.exports = {
  startTest: async function () {
    const updateAction = msg => testReceiveAction(msg, testReceiver)
    testReceiver = new MessageReceiver(msgCfg.testQueue, updateAction)
    await testReceiver.subscribe()
  }
}
