const Joi = require('joi');

// this is a patient validator that ensures the format and structure of the data is valid
// NOTE: the validator is made based on the test data to ensure all data would validate
const patientSchema = Joi.object({
    "CPR-nr.": Joi.string()
        .pattern(new RegExp('^[0-9]{9,10}')).required(),
    "Født": Joi.date().required(),
    "Køn": Joi.string().valid('K', 'M').required(),    
    "Efternavn": Joi.string().required(),
    "Fornavn":  Joi.string().required(),
    "Adresse":  Joi.string().allow(''),
    "Kommune":  Joi.alternatives().try(
        Joi.number().integer().min(100).max(999),
        Joi.string().allow('')),
    "Region": Joi.alternatives().try(
        Joi.number().integer().min(10).max(99),
        Joi.string().allow('')),
    "Postnr": Joi.alternatives().try(
        Joi.number().integer().min(1000).max(9999),
        Joi.string().allow('')),
    "Værge": Joi.string().allow(''),
    "Kommentar": Joi.string().allow('')
})

module.exports = patientSchema