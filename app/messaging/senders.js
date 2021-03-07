const { MessageSender } = require('ffc-messaging')
const msgCfg = require('../config/messaging')

const calculateScoreSender = new MessageSender(msgCfg.calculateScoreQueue)
const desirabilitySubmittedSender = new MessageSender(msgCfg.desirabilitySubmittedTopic)

async function stop () {
  await calculateScoreSender.closeConnection()
  await desirabilitySubmittedSender.closeConnection()
}

process.on('SIGTERM', async () => {
  await stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await stop()
  process.exit(0)
})

async function sendMsg (sender, msgData, msgType) {
  const msg = {
    body: msgData,
    type: msgType,
    source: msgCfg.msgSrc
  }

  console.log('sending message', msg)

  await sender.sendMessage(msg)
}

module.exports = {
  calculateScore: async function (calculateScoreData) {
    await sendMsg(calculateScoreSender, calculateScoreData, msgCfg.calculateScoreMsgType)
  },
  desirabilitySubmitted: async function (desirabilitySubmittedData) {
    await sendMsg(desirabilitySubmittedSender, desirabilitySubmittedData, msgCfg.desirabilitySubmittedMsgType)
  }
}
