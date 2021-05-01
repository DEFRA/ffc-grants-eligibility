const { PublishEvent } = require('ffc-protective-monitoring')
const config = require('../config/server')

async function sendEvent (sessionId, event, pmcCode) {
  const protectiveMonitoring = new PublishEvent(config.protectiveMonitoringUrl)
  await protectiveMonitoring.sendEvent({
    sessionid: sessionId,
    datetime: createEventDate(),
    version: '1.1',
    application: 'FFC-GRANTS',
    component: 'Desirability Scoring Service',
    ip: '',
    pmccode: pmcCode,
    priority: '0',
    details: {
      message: event
    }
  })
  console.log(`Protective monitoring event sent: ${event}`)
}

function createEventDate () {
  const eventDate = new Date()
  return eventDate.toISOString()
}

module.exports = sendEvent
