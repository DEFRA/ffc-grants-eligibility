const server = require('./server')
const receivers = require('./messaging/receivers')
const processDesirabiltyAction = require('./messaging/process-desirability')
const processSubmissionAction = require('./messaging/process-submission')
const desirabilityScoreAction = require('./messaging/desirability-score')
const cache = require('./cache')

const init = async () => {
  receivers.startProjectDetailsReceiver(processDesirabiltyAction)
  receivers.startContactDetailsReceiver(processSubmissionAction)
  receivers.startDesirabilityScoreReceiver(desirabilityScoreAction)
  cache.initialise(server)

  require('./services/app-insights').setup()
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
