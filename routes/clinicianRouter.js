const express = require('express')
const utilities = require("./utilities");
const clinicianRouter = express.Router()
const clinicianController = require('../controllers/clinicianController')

/* Applying */

// clinician homepage
clinicianRouter.get('/dashboard', utilities.isLoggedInClinician, clinicianController.dashboard)

// patient daily info page
clinicianRouter.get('/patient-info/:patientID&:date', utilities.isLoggedInClinician, clinicianController.patientInfo)

// patient comment page ***
clinicianRouter.get('/comment', utilities.isLoggedInClinician, clinicianController.comment)

// new patient page
clinicianRouter.get('/add-patient', utilities.isLoggedInClinician, clinicianController.newPatient)


// patient note page ***
clinicianRouter.get('/note/:patientID', utilities.isLoggedInClinician, clinicianController.note)

// create patient note ***
clinicianRouter.post('/note/:patientID', utilities.isLoggedInClinician, clinicianController.newNote)


// edit patient's supporting message
clinicianRouter.post('/support-message/:patientID', utilities.isLoggedInClinician, clinicianController.supportMessage)

/* Testing */

// create new clinician
clinicianRouter.post('/create-clinician',  clinicianController.createClinician)

// create new patient
clinicianRouter.post('/create-patient',  clinicianController.createPatient)

// manage patient
clinicianRouter.post('/patient-management', utilities.isLoggedInClinician, clinicianController.patientManagement)

// add an existing patient
clinicianRouter.post('/add-patient', utilities.isLoggedInClinician, clinicianController.addPatient)

module.exports = clinicianRouter