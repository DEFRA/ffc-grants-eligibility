const msgCfg = require('../config/messaging')
const { MessageReceiver } = require('ffc-messaging')

let eligibilityAnswersReceiver
let projectDetailsReceiver
let contactDetailsReceiver
let desirabilityScoreReceiver

async function stop () {
  await eligibilityAnswersReceiver.closeConnection()
  await projectDetailsReceiver.closeConnection()
  await contactDetailsReceiver.closeConnection()
  await desirabilityScoreReceiver.closeConnection()
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
  startEligibilityAnswersReceiver: async function (eligibilityAnswersReceived) {
    const updateAction = msg => eligibilityAnswersReceived(msg, eligibilityAnswersReceiver)
    eligibilityAnswersReceiver = new MessageReceiver(msgCfg.eligibilityAnswersQueue, updateAction)
    await eligibilityAnswersReceiver.subscribe()
  },
  startProjectDetailsReceiver: async function (projectDetailsReceived) {
    const updateAction = msg => projectDetailsReceived(msg, projectDetailsReceiver)
    projectDetailsReceiver = new MessageReceiver(msgCfg.projectDetailsQueue, updateAction)
    await projectDetailsReceiver.subscribe()
  },
  startContactDetailsReceiver: async function (contactDetailsReceived) {
    const updateAction = msg => contactDetailsReceived(msg, contactDetailsReceiver)
    contactDetailsReceiver = new MessageReceiver(msgCfg.contactDetailsQueue, updateAction)
    await contactDetailsReceiver.subscribe()
  },
  startDesirabilityScoreReceiver: async function (desirabilityScoreReceived) {
    const updateAction = msg => desirabilityScoreReceived(msg, desirabilityScoreReceiver)
    desirabilityScoreReceiver = new MessageReceiver(msgCfg.desirabilityScoreSubscription, updateAction)
    await desirabilityScoreReceiver.subscribe()
  }
}
