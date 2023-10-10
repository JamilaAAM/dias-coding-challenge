const csv = require('csv-parser')
const fs = require('fs')
const patients = []
const patientValidator = require('./patient-validator.js')

//parse the csv file and get the data
fs.createReadStream('TestPatienter.csv')
    .pipe(csv())
    .on('data', (patient) => {
        //validate the data structure of each patient
        const validationRes = patientValidator.validate(patient)
        if (validationRes.error) {
            console.error("Validation error: ", validationRes.error.message)
        } else {
            remappedPatient = remapObject(patient)
            patients.push(remappedPatient)
        }
    })

// match birthdate with the wanted format
function parseBirthDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// get city based on postcode
function getCity(postcode) {
    switch (postcode) {
        case "3400": return 'Hillerød'
        case "6200": return 'Aabenraa'
        case "8000": return 'Aarhus'
        case "9970": return 'Strandby'
        case "5900": return 'Rudkøbing'
        case "6800": return 'Varde'
        case "5230": return 'Odense'
        case "9210": return 'Aalborg SØ'
        case "4700": return 'Næstved'
        default: return ''
    }
}

// remap to ensure the json output has the wanted format
// assumption: people born before 1940 are deceased
function remapObject(patient) {
    year = parseBirthDate(patient.Født).split('-')[0]
    const remappedPatient = {
        resourceType: 'Patient',
        identifier: {
            id: patient['CPR-nr.'],
            // object identifier - to be continued
            system: '1.2.208.176.1.2'
        },
        active: year > 1940 ? true : false,
        name: {
            family: patient.Efternavn,
            given: patient.Fornavn.split(' ')
        },
        gender: patient.Køn === 'M' ? 'male' : 'female',
        birthDate: parseBirthDate(patient.Født),
        deceasedBoolean: !(year > 1940),
        address: {
            line: patient.Adresse,
            city: getCity(patient.Postnr),
            postalCode: patient.Postnr,
            country: 'Danmark'
        },
        guardian: patient.Værge,
        comment: patient.Kommentar
    };
    return remappedPatient
}

module.exports = patients
