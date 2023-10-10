const patients = require('../patient/patients-from-csv')
const Joi = require('joi')

// get master data based on given cpr number
async function getPatient(_, res, cpr) {
    let patient;
    try {

        // create a validator to check CPR number is correct
        const validateCpr = Joi.string()
            .pattern(new RegExp('^[0-9]{9,10}')).required()

        const valRes = validateCpr.validate(cpr)
        if (valRes.error) {
            res.status(400).json({message: `Invalid cpr: ${valRes.error}`})
        }
        patient = patients.find(elem => elem.identifier.id == cpr)
        
        // CPR might be correct but if it's not in the CSV file an error is thrown
        if(!patient) res.status(404).json({message: "Patient with following cpr number does not exist"})
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    res.status(200).json(patient)
}

module.exports = getPatient