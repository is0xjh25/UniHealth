const demoData = require('../models/demoModel')

const getAllDemoData = (req, res) => {
    res.send(demoData) // send list to browser
}

const getDataById = (req, res) => {
    // search the database by ID
    const data = demoData.find(data => data.id === req.params.id)
    if (data) {
        res.send(data)
    } else {
        res.sendStatus(404)
    } 
}

module.exports = {
    getAllDemoData,
    getDataById
}