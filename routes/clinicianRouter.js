const express = require('express')
const utilities = require("./utilities");
const clinicianRouter = express.Router()
const clinicianController = require('../controllers/clinicianController')

/* Applying */

// clinician homepage
clinicianRouter.get('/dashboard', utilities.isLoggedInClinician, clinicianController.dashboard)

/* Testing */

// create new clinician
clinicianRouter.post('/create-clinician', utilities.isLoggedInClinician, clinicianController.createClinician)

// create new patient
clinicianRouter.post('/create-patient', utilities.isLoggedInClinician, clinicianController.createPatient)

// add new patient
clinicianRouter.post('/add-patient', utilities.isLoggedInClinician, clinicianController.addPatient)

// manage patient
clinicianRouter.post('/patient-management', utilities.isLoggedInClinician, clinicianController.patientManagement)

module.exports = clinicianRouter
