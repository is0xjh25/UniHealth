const express = require('express')
const patientRouter = express.Router()
const patientController = require('../controllers/patientController')

// patient
patientRouter.get('/dashboard', patientController.dashboard)

// add data for daily record
patientRouter.post('/add-data/:type', patientController.addData)

// add comment for daily record
patientRouter.post('/add-comment/:type', patientController.addComment)

module.exports = patientRouter
