const Patient = require('../models/patient.js')

const getPatientByEmail = async (req, res, next) => {
    try {
        const patient = await Patient.findOne({'email': req.params.patient_email}).lean()
        if (!patient) return res.sendStatus(404)
        res.send(patient)
    } catch (err) {
        return next(err)
    }

}

const createPatient = async (req, res, next) => {
    try {
        newPatient = new Patient( req.body )
        await newPatient.save()
        res.send(newPatient)
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getPatientByEmail,
    createPatient,
}