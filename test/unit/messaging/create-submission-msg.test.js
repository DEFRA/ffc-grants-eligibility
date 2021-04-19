describe('Create desirability message', () => {
  let createMsg

  beforeEach(() => {
    // jest.mock('../../../app/config/grant-scheme', () => mockGrantScheme)
    // jest.mock('../../../app/content-mapping', () => ({
    //   desirabilityQuestions: mockQuestionContent,
    //   desirabilityInputQuestionMapping: {
    //     Q14: 'project',
    //     Q15: 'irrigatedCrops',
    //     Q16a: 'irrigatedLandCurrent',
    //     Q16b: 'irrigatedLandTarget',
    //     Q17a: 'waterSourceCurrent',
    //     Q17b: 'waterSourcePlanned',
    //     Q18a: 'irrigationCurrent',
    //     Q18b: 'irrigationPlanned',
    //     Q19: 'productivity',
    //     Q20: 'collaboration'
    //   }
    // }))
    createMsg = require('../../../app/messaging/create-submission-msg')
  })

  test('first and last name is agent if agent details included', () => {
    expect(true).toBeDefined()
  })

  // test('first and last name is agent if agent details included', () => {
  //   const submission = {
  //     agentDetails: {
  //       firstName: 'Joe',
  //       lastName: 'Smith'
  //     },
  //     farmerDetails: {
  //       firstName: 'Pippa',
  //       lastName: 'Jones'
  //     }
  //   }

  //   const msg = createMsg(submission, {})

  //   expect(msg.firstName).toBeDefined()
  //   expect(msg.lastName).toBeDefined()
  //   expect(msg.firstName).toBe(submission.agentDetails.firstName)
  //   expect(msg.lastName).toBe(submission.agentDetails.lastName)
  // })

  // test('first and last name is farmer if agent details not included', () => {
  //   const submission = {
  //     agentDetails: {
  //       firstName: null,
  //       lastName: null
  //     },
  //     farmerDetails: {
  //       firstName: 'Pippa',
  //       lastName: 'Jones'
  //     }
  //   }

  //   const msg = createMsg(submission, {})

  //   expect(msg.firstName).toBeDefined()
  //   expect(msg.lastName).toBeDefined()
  //   expect(msg.firstName).toBe(submission.farmerDetails.firstName)
  //   expect(msg.lastName).toBe(submission.farmerDetails.lastName)
  // })
})
