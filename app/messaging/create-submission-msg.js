function getQuestionBand (questions, questionKey) {
  return questions.find(question => question.key === questionKey).rating.band
}

function getApplicantEmailDetails (submission, desirabilityScore) {
  return {
    notifyTemplate: 'fixme-dummy-id',
    emailAddress: submission.agentContactDetails.email ?? submission.farmerContactDetails.email,
    details: {
      firstName: submission.agentDetails.firstName ?? submission.farmerDetails.firstName,
      lastName: submission.agentDetails.lastName ?? submission.farmerDetails.lastName,
      referenceNumber: submission.confirmationId,
      overallRating: desirabilityScore.desirability.overallRating.band,
      crops: submission.farmingType,
      legalStatus: submission.legalStatus,
      location: `England ${submission.projectPostcode}`,
      landOwnership: submission.landOwnership,
      tenancyAgreement: submission.tenancyLength,
      infrastructureEquipment: submission.projectInfrastucture.join(', '),
      irrigationEquipment: submission.projectEquipment.join(', '),
      technology: submission.projectTechnology.join(', '),
      itemsCost: `£${submission.projectCost}`,
      potentialFunding: `£${submission.calculatedGrant}`,
      remainingCost: `£${submission.remainingCost}`,
      projectStarted: submission.projectStarted,
      planningPermission: submission.planningPermission,
      abstractionLicence: submission.abstractionLicence,
      projectName: submission.businessDetails.projectName,
      projectDetails: submission.project.join(', '),
      projectDetailsScore: getQuestionBand(desirabilityScore.desirability.questions, 'Q14'),
      irrigatedCrops: submission.irrigatedCrops,
      irrigatedLandCurrent: submission.irrigatedLandCurrent,
      irrigatedLandTarget: submission.irrigatedLandTarget,
      irrigatedLandScore: getQuestionBand(desirabilityScore.desirability.questions, 'Q16'),
      waterSourceCurrent: submission.waterSourceCurrent.join(', '),
      waterSourcePlanned: submission.waterSourcePlanned.join(', '),
      waterSourceScore: getQuestionBand(desirabilityScore.desirability.questions, 'Q17'),
      irrigationCurrent: submission.irrigationCurrent.join(', '),
      irrigationPlanned: submission.irrigationPlanned.join(', '),
      irrigationScore: getQuestionBand(desirabilityScore.desirability.questions, 'Q18'),
      productivity: submission.productivity.join(', '),
      productivityScore: getQuestionBand(desirabilityScore.desirability.questions, 'Q19'),
      collaboration: submission.collaboration,
      collaborationScore: getQuestionBand(desirabilityScore.desirability.questions, 'Q20')
    }
  }
}

module.exports = function (submission, desirabilityScore) {
  return {
    applicantEmail: getApplicantEmailDetails(submission, desirabilityScore)
  }
}
