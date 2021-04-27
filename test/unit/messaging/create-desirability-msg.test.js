const desirabilityQuestions = ['Q14', 'Q15', 'Q16', 'Q17', 'Q18', 'Q19', 'Q20']

const mockQuestionContent = {
  Q14: [
    {
      key: 'Q14',
      title: 'Q14 title',
      answers: {
        'Q14-A1': 'Q14 answer 1',
        'Q14-A2': 'Q14 answer 2'
      }
    }
  ],
  Q15: [
    {
      key: 'Q15',
      title: 'Q15 title',
      answers: {
        'Q15-A1': 'Q15 answer'
      }
    }
  ],
  Q16: [
    {
      key: 'Q16a',
      title: 'Q16a title'
    },
    {
      key: 'Q16b',
      title: 'Q16b title'
    }
  ],
  Q17: [
    {
      key: 'Q17a',
      title: 'Q17a title',
      answers: {
        'Q17a-A1': 'Q17a answer'
      }
    },
    {
      key: 'Q17b',
      title: 'Q17b title',
      answers: {
        'Q17b-A1': 'Q17b answer'
      }
    }
  ],
  Q18: [
    {
      key: 'Q18a',
      title: 'Q18a title',
      answers: {
        'Q18a-A1': 'Q18a answer 1',
        'Q18a-A2': 'Q18a answer 2'
      }
    },
    {
      key: 'Q18b',
      title: 'Q18b title',
      answers: {
        'Q18b-A1': 'Q18b answer'
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
  project: ['Q14 answer 1', 'Q14 answer 2'],
  irrigatedCrops: 'Q15 answer',
  irrigatedLandCurrent: 100,
  irrigatedLandTarget: 200,
  waterSourceCurrent: ['Q17a answer'],
  waterSourcePlanned: ['Q17b answer'],
  irrigationCurrent: ['Q18a answer 1', 'Q18a answer 2'],
  irrigationPlanned: ['Q18b answer'],
  productivity: ['Q19 answer'],
  collaboration: 'Q20 answer'
}

const mockGrantSchemeKey = 'testKey'
const mockGrantSchemeName = 'testName'
const mockGrantScheme = {
  key: mockGrantSchemeKey,
  name: mockGrantSchemeName
}

describe('Create desirability message', () => {
  let createMsg
  let msg

  beforeEach(() => {
    jest.mock('../../../app/config/grant-scheme', () => mockGrantScheme)
    jest.mock('../../../app/content-mapping', () => ({
      desirabilityQuestions: mockQuestionContent,
      desirabilityInputQuestionMapping: {
        Q14: 'project',
        Q15: 'irrigatedCrops',
        Q16a: 'irrigatedLandCurrent',
        Q16b: 'irrigatedLandTarget',
        Q17a: 'waterSourceCurrent',
        Q17b: 'waterSourcePlanned',
        Q18a: 'irrigationCurrent',
        Q18b: 'irrigationPlanned',
        Q19: 'productivity',
        Q20: 'collaboration'
      }
    }))
    createMsg = require('../../../app/messaging/create-desirability-msg')
    msg = createMsg(mockUserInput)
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

  test('contains the correct answers', () => {
    const questions = msg.desirability.questions
    const q14 = questions.find(q => q.key === 'Q14')
    const q15 = questions.find(q => q.key === 'Q15')
    const q16 = questions.find(q => q.key === 'Q16')
    const q17 = questions.find(q => q.key === 'Q17')
    const q18 = questions.find(q => q.key === 'Q18')
    const q19 = questions.find(q => q.key === 'Q19')
    const q20 = questions.find(q => q.key === 'Q20')

    const q16aAnswers = q16.answers.find(a => a.key === 'Q16a')
    const q16bAnswers = q16.answers.find(a => a.key === 'Q16b')
    const q17aAnswers = q17.answers.find(a => a.key === 'Q17a')
    const q17bAnswers = q17.answers.find(a => a.key === 'Q17b')
    const q18aAnswers = q18.answers.find(a => a.key === 'Q18a')
    const q18bAnswers = q18.answers.find(a => a.key === 'Q18b')

    expect(q14.answers.length).toEqual(1)
    expect(q14.answers[0].title).toEqual('Q14 title')
    expect(q14.answers[0].input.length).toEqual(mockUserInput.project.length)
    expect(q14.answers[0].input).toEqual(expect.arrayContaining([expect.objectContaining({ value: mockUserInput.project[0] })]))
    expect(q14.answers[0].input).toEqual(expect.arrayContaining([expect.objectContaining({ value: mockUserInput.project[1] })]))

    expect(q15.answers.length).toEqual(1)
    expect(q15.answers[0].title).toEqual('Q15 title')
    expect(q15.answers[0].input.length).toEqual(1)
    expect(q15.answers[0].input[0].value).toEqual(mockUserInput.irrigatedCrops)

    expect(q16.answers.length).toEqual(2)
    expect(q16aAnswers.title).toEqual('Q16a title')
    expect(q16aAnswers.input.length).toEqual(1)
    expect(q16aAnswers.input[0].value).toEqual(mockUserInput.irrigatedLandCurrent)
    expect(q16bAnswers.title).toEqual('Q16b title')
    expect(q16bAnswers.input.length).toEqual(1)
    expect(q16bAnswers.input[0].value).toEqual(mockUserInput.irrigatedLandTarget)

    expect(q17.answers.length).toEqual(2)
    expect(q17aAnswers.title).toEqual('Q17a title')
    expect(q17aAnswers.input.length).toEqual(mockUserInput.waterSourceCurrent.length)
    expect(q17aAnswers.input[0].value).toEqual(mockUserInput.waterSourceCurrent[0])
    expect(q17bAnswers.title).toEqual('Q17b title')
    expect(q17bAnswers.input.length).toEqual(mockUserInput.waterSourcePlanned.length)
    expect(q17bAnswers.input[0].value).toEqual(mockUserInput.waterSourcePlanned[0])

    expect(q18.answers.length).toEqual(2)
    expect(q18aAnswers.title).toEqual('Q18a title')
    expect(q18aAnswers.input.length).toEqual(mockUserInput.irrigationCurrent.length)
    expect(q18aAnswers.input).toEqual(expect.arrayContaining([expect.objectContaining({ value: mockUserInput.irrigationCurrent[0] })]))
    expect(q18aAnswers.input).toEqual(expect.arrayContaining([expect.objectContaining({ value: mockUserInput.irrigationCurrent[1] })]))
    expect(q18bAnswers.title).toEqual('Q18b title')
    expect(q18bAnswers.input.length).toEqual(mockUserInput.irrigationPlanned.length)
    expect(q18bAnswers.input[0].value).toEqual(mockUserInput.irrigationPlanned[0])

    expect(q19.answers.length).toEqual(1)
    expect(q19.answers[0].title).toEqual('Q19 title')
    expect(q19.answers[0].input.length).toEqual(mockUserInput.productivity.length)
    expect(q19.answers[0].input[0].value).toEqual(mockUserInput.productivity[0])

    expect(q20.answers.length).toEqual(1)
    expect(q20.answers[0].title).toEqual('Q20 title')
    expect(q20.answers[0].input.length).toEqual(1)
    expect(q20.answers[0].input[0].value).toEqual(mockUserInput.collaboration)
  })

  test('adds rating to each question', () => {
    const ratingObj = { score: null, band: null, importance: null }
    msg.desirability.questions.forEach(q => expect(q.rating).toMatchObject(ratingObj))
  })

  test('adds overall rating to desirability', () => {
    expect(msg.desirability.overallRating).toMatchObject({ score: null, band: null })
  })
})
