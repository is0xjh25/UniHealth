const Clinician = require('../models/clinician.js')
const Patient = require('../models/patient.js')
const DailyRecord = require('../models/dailyRecord.js')

const getAllUsers = async (req, res, next) => {
    try {
        const clinicians = await Clinician.find().lean()
        const patients = await Patient.find().lean()
        return res.render('API-home', {clinicians: clinicians, patients: patients})
    } catch (err) {
        return next(err)
    }
}

const createClinician = async (req, res, next) => {
    try {
        newClinician = new Clinician(req.body)
        await newClinician.save()
        return res.redirect('/api-home')
    } catch (err) {
        return next(err)
    }
}

const createPatient = async (req, res, next) => {
    try {
        newPatient = new Patient(req.body)
        await newPatient.save()
        return res.redirect('/api-home')
    } catch (err) {
        return next(err)
    }
}

const addPatient = async (req, res, next) => {
    try {
        const clinician = await Clinician.findById(req.session.passport.user)
        if (!clinician) return res.send("Error: Clinician not found")
        const patient = await Patient.findOne({email: req.body.email}).lean()
        if (!patient) return res.send("Error: Patient not found")
        clinician.patients.addToSet(patient._id)
        clinician.save()
        return res.redirect('/clinician/dashboard')
    } catch (err) {
        return next(err)
    }
}

const dashboard = async (req, res, next) => {
    try {
        const clinician = await Clinician.findById(req.session.passport.user).lean()
        const patients = []
        const today = new Date().toDateString()
        await Promise.all(
            clinician.patients.map(async (p) => {
                let patient = await Patient.findById(p._id).lean()
                if (patient) {
        			const record = await DailyRecord.findOne( {$and: [{"_patientID": patient._id}, {"date": today}]}).lean()
                    patients.push({patient: patient, record: record})
                } 
            })
        )
        return res.render('API-clinician', {clinician: clinician, patients: patients})
    } catch (err) {
        return next(err)
    }
}

const patientManagement = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.body.patientID)
        const query = {
            [req.body.type]: {
                timeSeries: req.body.timeSeries,
                upperThreshold: req.body.upperThreshold,
                lowerThreshold: req.body.lowerThreshold
            }
        }
        await patient.updateOne({management: query}, { upsert: true })
        return res.redirect('/clinician/dashboard')
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getAllUsers,
    createClinician,
    createPatient,
    addPatient,
    dashboard,
    patientManagement,
}