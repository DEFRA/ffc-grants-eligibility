describe('Config Messaging', () => {
  const messageConfig = require('../../../app/config/messaging')
  test('Check queue and topic subscription defined', () => {
    expect(messageConfig).toBeDefined()
    expect(messageConfig.calculateScoreMsgType).toBeDefined()
    expect(messageConfig.contactDetailsQueue).toBeDefined()
    expect(messageConfig.calculateScoreQueue).toBeDefined()
    expect(messageConfig.desirabilityScoreSubscription).toBeDefined()
    expect(messageConfig.desirabilitySubmittedTopic).toBeDefined()
    expect(messageConfig.desirabilitySubmittedMsgType).toBeDefined()
    expect(messageConfig.calculateScoreMsgType).toBeDefined()
    expect(messageConfig.msgSrc).toBe('ffc-grants-eligibility')
  })
})
