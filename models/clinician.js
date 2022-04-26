const mongoose = require("mongoose")

var PatientModel = require('./patient.js')
var NoteModel = require('./note.js')

const clinicianSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
	phone: { type: String, required: true },
	patients: [PatientModel.schema],
	notes: [NoteModel.schema]
})

const Clinician = mongoose.model('Clinician', clinicianSchema)

module.exports = Clinician