const mongoose = require('mongoose')

var PatientModel = require('./patient.js')

const noteSchema = new mongoose.Schema({
    patient: PatientModel.schema,
    content: { type: String, required: true },
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
