const express = require('express')
const getPatient = require('./controllers/getPatient')
const winston = require('winston')

const app = express()

const PORT = process.env.PORT || 8080

// create winston logger with file transport and console transport
// file transport ensures the logs are collected in app.log - console transport ensures the logs are printed in console
const logger = winston.createLogger({ 
    level: 'info', 
    format: winston.format.json(), 
    transports: [ 
        new winston.transports.Console(), 
        new winston.transports.File({  
            filename: 'app.log' 
        }) 
    ] 
}); 

// endpoint for retrieving master data based on CPR
app.get("/getPatient", async (req, res) => {
    const patientID = req.query.patientID
    await getPatient(req, res, patientID) 
    logger.info(`retrieve patient data based on CPR number: ${patientID}`)
})

// define an API route for viewing the logs 
app.get('/auditlog', (req, res) => { 
  
    // query the logger for the latest log entries 
    logger.query({ order: 'desc', limit: 50 }, 
        (err, results) => { 
            if (err) { 
  
                // error if unsuccessful in the retrieval
                res.status(500).send({  
                    error: 'Error retrieving logs' 
                }); 
            } else { 
  
                // view the logs in /auditlog
                res.send(results); 
            } 
        }); 
}); 

app.use(express.json())

app.listen(PORT, () => logger.info('Listening on ' + PORT));