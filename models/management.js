const mongoose = require("mongoose")

const singleManagementSchema = new mongoose.Schema({
	timeSeries: { type: String, Enum: ["moring","noon","afternoon", "night"] },
	upperThreshold: { type: Number },
	lowerThreshold: { type: Number }
})

const managementSchema = new mongoose.Schema({
	supportMessage: { type: String },
	bloodGlucoseLevel: singleManagementSchema,
	weight: singleManagementSchema,
	doesesOfInsulinTaken: singleManagementSchema,
	exercise: singleManagementSchema
})

const Management = mongoose.model('Management', managementSchema)

module.exports = Management