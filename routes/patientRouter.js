const express = require('express')
const patientRouter = express.Router()
const patientController = require('../controllers/patientController')

// get patient by email
patientRouter.get('/:patient_email', patientController.getPatientByEmail)
// create new patient
patientRouter.post('/', patientController.createPatient)

module.exports = patientRouter
