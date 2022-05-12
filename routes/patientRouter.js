const express = require('express')
const utilities = require("./utilities");
const patientRouter = express.Router()
const patientController = require('../controllers/patientController')

/* Applying */

// patient
patientRouter.get('/dashboard', utilities.isLoggedInPatient, patientController.dashboard)

// add data for daily record
patientRouter.post('/add-data/:type', utilities.isLoggedInPatient, patientController.addData)

// add comment for daily record
patientRouter.post('/add-comment/:type', utilities.isLoggedInPatient, patientController.addComment)

// patient's record
patientRouter.get('/record', utilities.isLoggedInPatient, patientController.record)

// patient's rank
patientRouter.get('/rank', utilities.isLoggedInPatient, patientController.rank)

// patient's info page
patientRouter.get('/info', utilities.isLoggedInPatient, patientController.info)

module.exports = patientRouter
