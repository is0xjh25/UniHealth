const demoData = require('../models/demoModel')

const getAllDemoData = (req, res) => {
    res.send(demoData) // send list to browser
}

module.exports = {
    getAllDemoData
}