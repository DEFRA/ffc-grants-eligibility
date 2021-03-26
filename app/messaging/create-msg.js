const grantSchemeConfig = require('../config/grant-scheme')
const questionContent = require('../content-mapping')

const userInputQuestionMapping = {
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

function getUserAnswer (answers, userInput) {
  if (answers) {
    return [userInput].flat().map(answer =>
      ({ key: Object.keys(answers).find(key => answers[key] === answer), value: answer }))
  } else {
    return [{ key: null, value: userInput }]
  }
}

function getQuestionDetails (questionKey, userInput) {
  const content = questionContent[questionKey]

  return {
    key: questionKey,
    answers: content.map(({ key, title, answers }) => ({
      key,
      title,
      input: getUserAnswer(answers, userInput[userInputQuestionMapping[key]])
    })),
    rating: {
      score: null,
      band: null,
      importance: null
    }
  }
}

function desirability (userInput) {
  const desirabilityQuestions = ['Q14', 'Q15', 'Q16', 'Q17', 'Q18', 'Q19', 'Q20']

  return {
    grantScheme: {
      key: grantSchemeConfig.key,
      name: grantSchemeConfig.name
    },
    desirability: {
      questions: desirabilityQuestions.map(questionKey => getQuestionDetails(questionKey, userInput)),
      overallRating: {
        score: null,
        band: null
      }
    }
  }
}

module.exports = {
  desirability
}
