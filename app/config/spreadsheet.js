const Joi = require('joi')

// Define config schema
const schema = Joi.object({
  hideEmptyRows: Joi.bool().default(false),
  protectEnabled: Joi.bool().default(false),
  protectPassword: Joi.string()
})

// Build config
const config = {
  hideEmptyRows: process.env.WORKSHEET_HIDE_EMPTY_ROWS,
  protectEnabled: process.env.WORKSHEET_PROTECT_ENABLED,
  protectPassword: process.env.WORKSHEET_PROTECT_PASSWORD
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The spreadsheet config is invalid. ${result.error.message}`)
}

module.exports = result.value
