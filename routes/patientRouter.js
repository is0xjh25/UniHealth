const express = require('express')
const utilities = require('./utilities')
const patientRouter = express.Router()
const patientController = require('../controllers/patientController')

/* Applying */

// patient homepage
patientRouter.get(
    '/dashboard',
    utilities.isLoggedInPatient,
    patientController.dashboard
)

// add data for daily record
patientRouter.post(
    '/add-data/:type',
    utilities.isLoggedInPatient,
    patientController.addData
)

// add comment for daily record
patientRouter.post(
    '/add-comment/:type',
    utilities.isLoggedInPatient,
    patientController.addComment
)

// patient's record page
patientRouter.get(
    '/record',
    utilities.isLoggedInPatient,
    patientController.record
)

// patient's rank page ***
patientRouter.get('/rank', utilities.isLoggedInPatient, patientController.rank)

// patient's profile page
patientRouter.get(
    '/profile',
    utilities.isLoggedInPatient,
    patientController.profile
)

// patient's statistics page
patientRouter.get(
    '/statistics',
    utilities.isLoggedInPatient,
    patientController.statistics
)

// patient reset password ***
patientRouter.post(
    '/reset-password',
    utilities.isLoggedInPatient,
    patientController.resetPassword
)

module.exports = patientRouter
