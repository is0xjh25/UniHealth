const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
    data: {
        uploadBy: { type: Date, default: Date.now },
        content: { type: Number },
    },
    comment: {
        uploadBy: { type: Date, default: Date.now },
        content: { type: String },
    },
})

const dailyRecordSchema = new mongoose.Schema({
    bloodGlucoseLevel: recordSchema,
    weight: recordSchema,
    doesesOfInsulinTaken: recordSchema,
    exercise: recordSchema,
})

const DailyRecord = mongoose.model('DailyRecord', dailyRecordSchema)

module.exports = DailyRecord
