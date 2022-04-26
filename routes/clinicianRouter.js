const express = require('express')

const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')

clinicianRouter.get('/:clinician_email', clinicianController.getClinicianByEmail)
clinicianRouter.post('/', clinicianController.createClinician)

module.exports = clinicianRouter