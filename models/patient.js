const mongoose = require("mongoose")
var DailyRecordModel = require('./record.js')
var ManagementModel = require('./management.js')

const patientSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
	phone: { type: String, required: true },
	gender: { type: String, Enum: ["male","female","others"], required: true },
	yearBorn: { type: Number, min: 1900 },
	biography: { type: String },
	dailyRecords: [DailyRecordModel.schema],
	management: ManagementModel.schema
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient