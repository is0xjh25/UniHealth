const mongoose = require('mongoose')

const dailyRecordSchema = new mongoose.Schema({
    _patientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    createBy: { type: Date, default: Date.now, require: true },
    date: { type: String, require: true },
    bloodGlucoseLevelData: { type: Number },
    bloodGlucoseLevelComment: { type: String },
    bloodGlucoseLevelTime: { type: Date },
    weightData: { type: Number },
    weightComment: { type: String },
    weightTime: { type: Date },
    doesesOfInsulinTakenData: { type: Number },
    doesesOfInsulinTakenComment: { type: String },
    doesesOfInsulinTakenTime: { type: Date },
    exerciseData: { type: Number },
    exerciseComment: { type: String },
    exerciseTime: { type: Date },
})

const DailyRecord = mongoose.model('DailyRecord', dailyRecordSchema)

module.exports = DailyRecord