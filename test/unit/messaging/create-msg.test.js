const desirabilityQuestions = ['Q14', 'Q15', 'Q16', 'Q17', 'Q18', 'Q19', 'Q20']

const mockQuestionContent = {
  Q14: [
    {
      key: 'Q14',
      title: 'Q14 title',
      answers: {
        'Q14-A1': 'answer 1',
        'Q14-A2': 'answer 2'
      }
    }
  ],
  Q15: [
    {
      key: 'Q15',
      title: '',
      answers: {
        'Q15-A1': 'Field-scale crops'
      }
    }
  ],
  Q16: [
    {
      key: 'Q16a',
      title: ''
    },
    {
      key: 'Q16b',
      title: ''
    }
  ],
  Q17: [
    {
      key: 'Q17a',
      title: '',
      answers: {
        'Q17a-A1': 'Peak flow surface water'
      }
    },
    {
      key: 'Q17b',
      title: '',
      answers: {
        'Q17b-A1': 'Peak flow surface water'
      }
    }
  ],
  Q18: [
    {
      key: 'Q18a',
      title: '',
      answers: {
        'Q18a-A1': 'Trickle',
        'Q18a-A2': 'Boom irrigator'
      }
    },
    {
      key: 'Q18b',
      title: '',
      answers: {
        'Q18b-A1': 'Trickle'
      }
    }
  ],
  Q19: [
    {
      key: 'Q19',
      title: 'Q19 title',
      answers: {
        'Q19-A1': 'Q19 answer'
      }
    }
  ],
  Q20: [
    {
      key: 'Q20',
      title: 'Q20 title',
      answers: {
        'Q20-A1': 'Q20 answer'
      }
    }
  ]
}

const mockUserInput = {
  project: ['project'],
  irrigatedCrops: 'crops',
  irrigatedLandCurrent: 100,
  irrigatedLandTarget: 200,
  waterSourceCurrent: ['water current'],
  waterSourcePlanned: ['water plannerd'],
  irrigationCurrent: ['irrigation current'],
  irrigationPlanned: ['irrigation planned'],
  productivity: ['productivity'],
  collaboration: 'Yes'
}

// const mockUserInput = {
//   project: ['Improve irrigation efficiency'],
//   irrigatedCrops: 'Field-scale crops',
//   irrigatedLandCurrent: 88,
//   irrigatedLandTarget: 199,
//   waterSourceCurrent: ['Rain water harvesting'],
//   waterSourcePlanned: ['Rain water harvesting'],
//   irrigationCurrent: ['Trickle'],
//   irrigationPlanned: ['Boom irrigator'],
//   productivity: ['Increased yield per hectare'],
//   collaboration: 'No'
// }

const mockGrantSchemeKey = 'testKey'
const mockGrantSchemeName = 'testName'
const mockGrantScheme = {
  key: mockGrantSchemeKey,
  name: mockGrantSchemeName
}

describe('Create messages', () => {
  let createMsg
  let msg

  beforeEach(() => {
    jest.mock('../../../app/config/grant-scheme', () => mockGrantScheme)
    jest.mock('../../../app/content-mapping', () => mockQuestionContent)
    createMsg = require('../../../app/messaging/create-msg')
  })

  describe('Desirability message', () => {
    beforeEach(() => {
      msg = createMsg.desirability(mockUserInput)
    })

    test('adds grant scheme details', () => {
      expect(msg.grantScheme).toBeDefined()
      expect(msg.grantScheme.key).toBe(mockGrantSchemeKey)
      expect(msg.grantScheme.name).toBe(mockGrantSchemeName)
    })

    test('adds desirability property with questions', () => {
      expect(msg.desirability).toBeDefined()
      expect(msg.desirability.questions).toBeDefined()
    })

    test('contains the correct questions', () => {
      const questionKeys = msg.desirability.questions.map(q => q.key)
      expect(questionKeys.length).toEqual(desirabilityQuestions.length)
      expect(questionKeys).toEqual(expect.arrayContaining(desirabilityQuestions))
    })

    test('adds rating to each question', () => {
      const ratingObj = { score: null, band: null, importance: null }
      msg.desirability.questions.forEach(q => expect(q.rating).toMatchObject(ratingObj))
    })

    test('adds overall rating to desirability', () => {
      expect(msg.desirability.overallRating).toMatchObject({ score: null, band: null })
    })
  })
})
