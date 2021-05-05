jest.mock('ffc-messaging')
jest.mock('../../../app/services/protective-monitoring-service')
const ffcMessaging = require('ffc-messaging')
ffcMessaging.MessageSender = jest.fn().mockImplementation(() => {
  return {
    closeConnection: jest.fn(),
    sendMessage: jest.fn(async (message) => {})
  }
})
ffcMessaging.MessageReceiver = jest.fn().mockImplementation((queue, updateAction) => {
  return {
    closeConnection: jest.fn(),
    subscribe: jest.fn()
  }
})
describe('messaging tests', () => {
  test('Senders Should be defined', () => {
    const senders = require('../../../app/messaging/senders')
    expect(senders).toBeDefined()
  })
  test('Senders sendCalculateScore Should not throw error', async () => {
    const senders = require('../../../app/messaging/senders')
    await expect(senders.sendCalculateScore('', '')).resolves.not.toThrow()
  })
  test('Senders sendDesirabilitySubmitted Should not throw error', async () => {
    const senders = require('../../../app/messaging/senders')
    await expect(senders.sendDesirabilitySubmitted('', '')).resolves.not.toThrow()
  })
  test('Receiver Should be defined', () => {
    const receivers = require('../../../app/messaging/receivers')
    expect(receivers).toBeDefined()
  })
  test('Receiver startEligibilityAnswersReceiver Should not throw error', async () => {
    const receivers = require('../../../app/messaging/receivers')
    await expect(receivers.startEligibilityAnswersReceiver('')).resolves.not.toThrow()
  })
  test('Receiver startProjectDetailsReceiver Should not throw error', async () => {
    const receivers = require('../../../app/messaging/receivers')
    await expect(receivers.startProjectDetailsReceiver('')).resolves.not.toThrow()
  })
  test('Receiver startContactDetailsReceiver Should not throw error', async () => {
    const receivers = require('../../../app/messaging/receivers')
    await expect(receivers.startContactDetailsReceiver('')).resolves.not.toThrow()
  })
  test('Receiver startDesirabilityScoreReceiver Should not throw error', async () => {
    const receivers = require('../../../app/messaging/receivers')
    await expect(receivers.startDesirabilityScoreReceiver('')).resolves.not.toThrow()
  })
})
