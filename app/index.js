const server = require('./server')
const receivers = require('./messaging/receivers')
const processEligibilityAction = require('./messaging/process-eligibility')
const processDesirabiltyAction = require('./messaging/process-desirability')
const processSubmissionAction = require('./messaging/process-submission')
const desirabilityScoreAction = require('./messaging/desirability-score')

const init = async () => {
  receivers.startEligibilityAnswersReceiver(processEligibilityAction)
  receivers.startProjectDetailsReceiver(processDesirabiltyAction)
  receivers.startContactDetailsReceiver(processSubmissionAction)
  receivers.startDesirabilityScoreReceiver(desirabilityScoreAction)

  await server.start()
  console.log('Server running on %s', server.info.uri)

  const myCache = server.cache({
    expiresIn: 3600 * 1000, // 1 hour
    segment: 'test-segment'
  })

  console.log(`Redis cache is ready to use: ${myCache.isReady()}`)

  const key = 'testing-redis'
  await myCache.set(key, 'A nice value to test Redis cache')

  const value = await myCache.get(key)
  console.log(value)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
