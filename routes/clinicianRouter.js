const express = require('express')
const clinicianRouter = express.Router()
const clinicianController = require('../controllers/clinicianController')

// get clinician by email
clinicianRouter.get('/:clinician_email', clinicianController.getClinicianByEmail)
// create new clinician
clinicianRouter.post('/', clinicianController.createClinician)

module.exports = clinicianRouter
