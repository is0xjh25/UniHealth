const express = require('express')
const demoRouter = express.Router()
const demoController = require('../controllers/demoController')

demoRouter.get('/', demoController.getAllDemoData)
module.exports = demoRouter