const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const clinicianSchema = new mongoose.Schema({
    role: { type: String, Enum: ['clinician', 'patient'], default: 'clinician', required: true },
    registered: { type: Date, default: Date.now, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    patients: [{_patientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }}],
    notes: [{
        patient: {_patientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient'}},
        createBy: { type: Date, default: Date.now, required: true },
        content: { type: String, required: true },
    }]
})

clinicianSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}

const SALT_FACTOR = 10

clinicianSchema.pre('save', function save(next) {
    const user = this
    if (!user.isModified('password')) return next()
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => { 
        if (err) return next(err)
        user.password = hash
        next() 
    })
})

const Clinician = mongoose.model('Clinician', clinicianSchema)

module.exports = Clinician