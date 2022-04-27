const express = require('express')
const clinicianRouter = express.Router()
const clinicianController = require('../controllers/clinicianController')

// create new clinician
clinicianRouter.post('/create-clinician', clinicianController.createClinician)
// create new patient
clinicianRouter.post('/create-patient', clinicianController.createPatient)
// add new patient
clinicianRouter.post('/add-patient', clinicianController.addPatient)
// clinician homepage
clinicianRouter.get('/dashboard', clinicianController.dashboard)
// manage patient
clinicianRouter.post('/patient-management', clinicianController.patientManagement)

module.exports = clinicianRouter
