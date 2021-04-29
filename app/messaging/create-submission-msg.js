const emailConfig = require('../config/email')
const spreadsheetConfig = require('../config/spreadsheet')

function getQuestionScoreBand (questions, questionKey) {
  return questions.find(question => question.key === questionKey).rating.band
}

function generateRow (rowNumber, name, value, bold = false) {
  return {
    row: rowNumber,
    values: ['', name, value],
    bold
  }
}

function farmingTypeMapping (farmingType) {
  switch (farmingType) {
    case 'Crops for the food industry':
      return 'Arable farmer'
    case 'Horticulture (including ornamentals)':
      return 'Horticultural business'
    default:
      return 'Error: failed to map farming type'
  }
}

function calculateBusinessSize (employees, turnover) {
  const employeesNum = Number(employees)
  const turnoverNum = Number(turnover)

  if (employeesNum < 10 && turnoverNum < 1740000) { // €2m turnover
    return 'Micro'
  } else if (employeesNum < 50 && turnoverNum < 8680000) { // €10m turnover
    return 'Small'
  } else if (employeesNum < 250 && turnoverNum < 43410000) { // €50m turnover
    return 'Medium'
  } else {
    return 'Large'
  }
}

function addAgentDetails (agentDetails, agentAddressDetails, agentContactDetails) {
  return [
    generateRow(26, 'Agent Surname', agentDetails?.lastName ?? ''),
    generateRow(27, 'Agent Forename', agentDetails?.firstName ?? ''),
    generateRow(29, 'Agent Address line 1', agentAddressDetails?.address1 ?? ''),
    generateRow(30, 'Agent Address line 2', agentAddressDetails?.address2 ?? ''),
    generateRow(32, 'Agent Address line 4 (town)', agentAddressDetails?.town ?? ''),
    generateRow(33, 'Agent Address line 5 (County)', agentAddressDetails?.county ?? ''),
    generateRow(34, 'Agent Postcode (use capitals)', agentAddressDetails?.postcode ?? ''),
    generateRow(35, 'Agent Landline number', agentContactDetails?.landline ?? ''),
    generateRow(36, 'Agent Mobile number', agentContactDetails?.mobile ?? ''),
    generateRow(37, 'Agent Email', agentContactDetails?.email ?? '')
  ]
}

function generateExcelFilename (scheme, projectName, businessName, referenceNumber, today) {
  const dateTime = new Intl.DateTimeFormat('en-GB', {
    timeStyle: 'short',
    dateStyle: 'short',
    timeZone: 'Europe/London'
  }).format(today).replace(/\//g, '-')
  return `${scheme}_${projectName}_${businessName}_${referenceNumber}_${dateTime}.xlsx`
}

function getSpreadsheetDetails (submission, desirabilityScore) {
  const today = new Date()
  const todayStr = today.toLocaleDateString('en-GB')
  const subScheme = 'FTF-Water'

  return {
    filename: generateExcelFilename(
      subScheme.trim(),
      submission.businessDetails.projectName.trim(),
      submission.businessDetails.businessName.trim(),
      submission.confirmationId.trim(),
      today
    ),
    uploadLocation: `Farming Investment Fund/Farming Transformation Fund/${spreadsheetConfig.uploadEnvironment}/Water/`,
    worksheets: [
      {
        title: 'DORA DATA',
        ...(spreadsheetConfig.protectEnabled ? { protectPassword: spreadsheetConfig.protectPassword } : {}),
        hideEmptyRows: spreadsheetConfig.hideEmptyRows,
        defaultColumnWidth: 30,
        rows: [
          generateRow(1, 'Field Name', 'Field Value', true),
          generateRow(2, 'FA or OA', 'Outline Application'),
          generateRow(40, 'Scheme', 'Farming Transformation Fund'),
          generateRow(39, 'Sub scheme', subScheme),
          generateRow(43, 'Theme', 'Water Resource Management'),
          generateRow(90, 'Project type', 'Water management'),
          generateRow(41, 'Owner', 'RD'),
          generateRow(341, 'Grant Application Window', ''),
          generateRow(53, 'Business Type', farmingTypeMapping(submission.farmingType)),
          generateRow(23, 'Status of applicant', submission.legalStatus),
          generateRow(45, 'Location of project (postcode)', submission.projectPostcode),
          generateRow(342, 'Land owned by Farm', submission.landOwnership),
          generateRow(343, 'Tenancy for next 5 years', submission.tenancyLength ?? ''),
          generateRow(344, 'Irrigation Infrastructure ', submission.projectItemsList.join('|')),
          generateRow(55, 'Total project expenditure', String(submission.projectCost)),
          generateRow(57, 'Grant rate', '40%'),
          generateRow(56, 'Grant amount requested', submission.calculatedGrant),
          generateRow(345, 'Remaining Cost to Farmer', submission.remainingCost),
          generateRow(346, 'Planning Permission Status', submission.planningPermission),
          generateRow(347, 'Abstraction License Status', submission.abstractionLicence),
          generateRow(348, 'Irrigation Impact', submission.project.join('|')),
          generateRow(349, 'Irrigation Impact Score', getQuestionScoreBand(desirabilityScore.desirability.questions, 'Q14')),
          generateRow(350, 'Irrigation Farming Scale (AKA Crop Type)', submission.irrigatedCrops),
          generateRow(351, 'Irrigation Crop Score', ''),
          generateRow(352, 'As-Is Irrigation (ha)', submission.irrigatedLandCurrent),
          generateRow(353, 'To-Be Irrigation (ha)', submission.irrigatedLandTarget),
          generateRow(354, 'Irrigation Hectare Score', getQuestionScoreBand(desirabilityScore.desirability.questions, 'Q16')),
          generateRow(355, 'As-Is Water Source', submission.waterSourceCurrent.join('|')),
          generateRow(356, 'To-Be Water Source', submission.waterSourcePlanned.join('|')),
          generateRow(357, 'Water Source Score', getQuestionScoreBand(desirabilityScore.desirability.questions, 'Q17')),
          generateRow(358, 'As-Is Irrigation Method', submission.irrigationCurrent.join('|')),
          generateRow(359, 'To-Be Irrigation Method', submission.irrigationPlanned.join('|')),
          generateRow(360, 'Irrigation Method Score', getQuestionScoreBand(desirabilityScore.desirability.questions, 'Q18')),
          generateRow(361, 'Irrigation Productivity Benefit', submission.productivity.join('|')),
          generateRow(362, 'Irrigation Productivity Score', getQuestionScoreBand(desirabilityScore.desirability.questions, 'Q19')),
          generateRow(363, 'Benefits Other Farms', submission.collaboration),
          generateRow(364, 'Other Farms Benefit Score', getQuestionScoreBand(desirabilityScore.desirability.questions, 'Q20')),
          generateRow(49, 'Site of Special Scientific Interest (SSSI)', submission.sSSI),
          generateRow(365, 'OA score', desirabilityScore.desirability.overallRating.band),
          generateRow(366, 'Date of OA decision', ''),
          generateRow(42, 'Project name', submission.businessDetails.projectName),
          generateRow(4, 'Single business identifier (SBI)', submission.businessDetails.sbi || '000000000'), // sbi is '' if not set so use || instead of ??
          generateRow(7, 'Business name', submission.businessDetails.businessName),
          generateRow(367, 'Annual Turnover', submission.businessDetails.businessTurnover),
          generateRow(22, 'Employees', submission.businessDetails.numberEmployees),
          generateRow(20, 'Business size', calculateBusinessSize(submission.businessDetails.numberEmployees, submission.businessDetails.businessTurnover)),
          generateRow(44, 'Description of project', submission.projectItemsList.join(', ').substring(0, 60)),
          generateRow(91, 'Are you an AGENT applying on behalf of your customer', submission.applying === 'Agent' ? 'Yes' : 'No'),
          generateRow(5, 'Surname', submission.farmerDetails.lastName),
          generateRow(6, 'Forename', submission.farmerDetails.firstName),
          generateRow(25, 'Main applicant gender', 'Applicant preferred not to say'),
          generateRow(24, 'Main applicant age', 'Applicant preferred not to say'),
          generateRow(8, 'Address line 1', submission.farmerAddressDetails.address1),
          generateRow(9, 'Address line 2', submission.farmerAddressDetails.address2),
          generateRow(11, 'Address line 4 (town)', submission.farmerAddressDetails.town),
          generateRow(12, 'Address line 5 (county)', submission.farmerAddressDetails.county),
          generateRow(13, 'Postcode (use capitals)', submission.farmerAddressDetails.postcode),
          generateRow(16, 'Landline number', submission.farmerContactDetails.landline),
          generateRow(17, 'Mobile number', submission.farmerContactDetails.mobile),
          generateRow(18, 'Email', submission.farmerContactDetails.email),
          generateRow(89, 'Customer is happy to be contacted by us or a third party working on our behalf', submission.consentGiven ? 'Yes' : 'No'),
          generateRow(368, 'Date ready for QC or decision', todayStr),
          generateRow(369, 'Eligibility Reference No.', submission.confirmationId),
          generateRow(94, 'Current location of file', 'NA Automated'),
          generateRow(92, 'RAG rating', 'Green'),
          generateRow(93, 'RAG date reviewed ', todayStr),
          generateRow(54, 'Electronic OA received date ', todayStr),
          generateRow(370, 'Status', 'Pending RPA review'),
          generateRow(371, 'Rationale', ''),
          generateRow(372, 'Decision maker', ''),
          generateRow(373, 'Full Application Due Date', (new Date(today.setMonth(today.getMonth() + 6))).toLocaleDateString('en-GB')),
          generateRow(374, 'Customer Marketing Indicator', submission.consentGiven ? 'Yes' : 'No'),
          generateRow(95, 'Measure table', '99'),
          generateRow(96, 'Measure year', '99'),
          ...addAgentDetails(submission.agentDetails, submission.agentAddressDetails, submission.agentContactDetails)
        ]
      }
    ]
  }
}

function getApplicantEmailDetails (submission, desirabilityScore) {
  return {
    notifyTemplate: emailConfig.notifyTemplate,
    emailAddress: submission.agentContactDetails?.email ?? submission.farmerContactDetails.email,
    details: {
      firstName: submission.agentDetails?.firstName ?? submission.farmerDetails.firstName,
      lastName: submission.agentDetails?.lastName ?? submission.farmerDetails.lastName,
      referenceNumber: submission.confirmationId,
      overallRating: desirabilityScore.desirability.overallRating.band,
      crops: submission.farmingType,
      legalStatus: submission.legalStatus,
      location: `England ${submission.projectPostcode}`,
      landOwnership: submission.landOwnership,
      tenancyAgreement: submission.tenancyLength ?? '',
      infrastructureEquipment: submission.projectInfrastucture.join(', '),
      irrigationEquipment: submission.projectEquipment.join(', '),
      technology: submission.projectTechnology.join(', '),
      itemsCost: String(submission.projectCost),
      potentialFunding: submission.calculatedGrant,
      remainingCost: submission.remainingCost,
      projectStarted: submission.projectStarted,
      planningPermission: submission.planningPermission,
      abstractionLicence: submission.abstractionLicence,
      projectName: submission.businessDetails.projectName,
      projectDetails: submission.project.join(', '),
      projectDetailsScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'Q14'),
      irrigatedCrops: submission.irrigatedCrops,
      irrigatedLandCurrent: submission.irrigatedLandCurrent,
      irrigatedLandTarget: submission.irrigatedLandTarget,
      irrigatedLandScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'Q16'),
      waterSourceCurrent: submission.waterSourceCurrent.join(', '),
      waterSourcePlanned: submission.waterSourcePlanned.join(', '),
      waterSourceScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'Q17'),
      irrigationCurrent: submission.irrigationCurrent.join(', '),
      irrigationPlanned: submission.irrigationPlanned.join(', '),
      irrigationScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'Q18'),
      productivity: submission.productivity.join(', '),
      productivityScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'Q19'),
      collaboration: submission.collaboration,
      collaborationScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'Q20'),
      sssi: submission.sSSI
    }
  }
}

module.exports = function (submission, desirabilityScore) {
  return {
    applicantEmail: getApplicantEmailDetails(submission, desirabilityScore),
    spreadsheet: getSpreadsheetDetails(submission, desirabilityScore)
  }
}
