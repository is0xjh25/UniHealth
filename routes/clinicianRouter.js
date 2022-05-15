const express = require('express')
const utilities = require("./utilities");
const clinicianRouter = express.Router()
const clinicianController = require('../controllers/clinicianController')

/* Applying */

// clinician homepage
clinicianRouter.get('/dashboard', utilities.isLoggedInClinician, clinicianController.dashboard)

// patient daily info page ***
clinicianRouter.get('/patient-info/:patientID&:date', utilities.isLoggedInClinician, clinicianController.patientInfo)

// patient comment page ***
clinicianRouter.get('/comment', utilities.isLoggedInClinician, clinicianController.comment)

// new patient page
clinicianRouter.get('/add-patient', utilities.isLoggedInClinician, clinicianController.newPatient)

// add an existing patient
clinicianRouter.post('/add-patient', utilities.isLoggedInClinician, clinicianController.addPatient)

// patient note page
// clinicianRouter.get('/note/:patientID', utilities.isLoggedInClinician, clinicianController.note)

// edit patient note
// clinicianRouter.post('/note/:patientID', utilities.isLoggedInClinician, clinicianController.editNote)

// clinician's profile page
// clinicianRouter.get('/profile', utilities.isLoggedInClinician, clinicianController.profile)

// edit clinician's profile
// clinicianRouter.post('/profile', utilities.isLoggedInClinician, clinicianController.editProfile)

// clinician reset password ***
clinicianRouter.post('/reset-password', utilities.isLoggedInClinician, clinicianController.resetPassword)

// patient's profile page
// clinicianRouter.get('/patient-profile/:patientID', utilities.isLoggedInClinician, clinicianController.patientProfile)

// edit patient's profile
// clinicianRouter.post('/patient-profile/:patientID', utilities.isLoggedInClinician, clinicianController.editPatientProfile)


// edit patient's supporting message
// clinicianRouter.post('/support-message/:patientID', utilities.isLoggedInClinician, clinicianController.editSupportMessage)


/* Testing */

// create new clinician
clinicianRouter.post('/create-clinician',  clinicianController.createClinician)

// create new patient
clinicianRouter.post('/create-patient',  clinicianController.createPatient)

// manage patient
clinicianRouter.post('/patient-management', utilities.isLoggedInClinician, clinicianController.patientManagement)

module.exports = clinicianRouter