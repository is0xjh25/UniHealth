const express = require('express')
const utilities = require("./utilities");
const clinicianRouter = express.Router()
const clinicianController = require('../controllers/clinicianController')

/* Applying */

// clinician homepage
clinicianRouter.get('/dashboard', utilities.isLoggedInClinician, clinicianController.dashboard)

// patient info
clinicianRouter.get('/patient-info/:patientID', utilities.isLoggedInClinician, clinicianController.patientInfo)

// add new patient
clinicianRouter.get('/add-patient', utilities.isLoggedInClinician, clinicianController.newPatient)
/* Testing */

// patient comment
clinicianRouter.get('/comment', utilities.isLoggedInClinician,clinicianController.comment)

// create new clinician
clinicianRouter.post('/create-clinician',  clinicianController.createClinician)

// create new patient
clinicianRouter.post('/create-patient',  clinicianController.createPatient)

// add new patient
clinicianRouter.post('/add-patient', utilities.isLoggedInClinician, clinicianController.addPatient)

// manage patient
clinicianRouter.post('/patient-management', utilities.isLoggedInClinician, clinicianController.patientManagement)

// clinician reset password
clinicianRouter.post('/reset-password', utilities.isLoggedInClinician, clinicianController.resetPassword)

module.exports = clinicianRouter