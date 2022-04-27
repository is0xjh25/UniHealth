const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
var DailyRecordModel = require('./record.js')
var ManagementModel = require('./management.js')

const patientSchema = new mongoose.Schema({
    role: {type: String, Enum: ['clinician', 'patient'], default: 'patient', required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    gender: {
        type: String,
        Enum: ['male', 'female', 'others'],
        required: true,
    },
    yearBorn: { type: Number, min: 1900 },
    biography: { type: String },
    dailyRecords: [DailyRecordModel.schema],
    management: ManagementModel.schema,
})

patientSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}

const SALT_FACTOR = 10

patientSchema.pre('save', function save(next) {
    const user = this
    if (!user.isModified('password')) return next()
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => { 
        if (err) return next(err)
        user.password = hash
        next() 
    })
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient
