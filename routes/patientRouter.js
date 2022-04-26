const express = require('express')

const patientRouter = express.Router()

const patientController = require('../controllers/patientController')

patientRouter.get('/:patient_email', patientController.getPatientByEmail)
patientRouter.post('/', patientController.createPatient)

module.exports = patientRouter