const Clinician = require('../models/clinician.js')
const Patient = require('../models/patient.js')
const DailyRecord = require('../models/dailyRecord.js')

const getAllUsers = async (req, res) => {
    try {
        const clinicians = await Clinician.find().lean()
        const patients = await Patient.find().lean()
        return res.render('test-home', {clinicians: clinicians, patients: patients})
    } catch (err) {
        console.log(err)
        return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
    }
}

const createClinician = async (req, res) => {
    try {
        newClinician = new Clinician(req.body)
        await newClinician.save()
        return res.redirect('/test-home')
    } catch (err) {
        console.log(err)
        return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
    }
}

const createPatient = async (req, res) => {
    try {
        const clinician = await Clinician.findById(req.session.passport.user)
        const newPatient = new Patient(req.body)
        await newPatient.save()
        clinician.patients.addToSet(newPatient._id)
        clinician.save()
        return res.redirect('/clinician/dashboard')
    } catch (err) {
        console.log(err)
        return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
    }
}

const dashboard = async (req, res) => {
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
        return res.render('clinician-dashboard', {date: today, clinician: clinician, patients: patients})
    } catch (err) {
        console.log(err)
        return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
    }
}

const patientManagement = async (req, res) => {
    try {
        const patient = await Patient.findById(req.body.patientID)
        const required = (req.body.required === "true")
        let management = {...patient.management}
        management[req.body.type] = {
            required: required,
            upperThreshold: req.body.upperThreshold,
            lowerThreshold: req.body.lowerThreshold
        }
        await patient.updateOne({$set: {"management": management}}, { upsert: true })
        return res.redirect(`/clinician/patient-info/${req.body.patientID}`)
    } catch (err) {
        console.log(err)
        return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
    }
}

const patientInfo = async (req, res) => {
    try {
        const today = new Date().toDateString()
        const patient = await Patient.findById(req.params.patientID).lean()
        const record = await DailyRecord.findOne( {$and: [{"_patientID": patient._id}, {"date": today}]}).lean()
        return res.render('clinician-patient-info', {date: today, patient: patient, record: record})
    } catch (err) {
        console.log(err)
        return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
    }
}

const addPatient = async (req, res) => {
    try {
        const clinician = await Clinician.findById(req.session.passport.user)
        const patient = await Patient.findOne({email: req.body.email}).lean()
        clinician.patients.addToSet(patient._id)
        clinician.save()
        return res.redirect('/clinician/dashboard')
    } catch (err) {
        console.log(err)
        return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
    }
}

const newPatient = async (req, res) => {
    try {
        return res.render("clinician-new-patient")
    } catch(err) {
        console.log(err)
        return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
    }
}

const comment = async (req, res) => {
    try {
        return res.render('clinician-comment')
    } catch {
        console.log(err)
        return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
    }
}

module.exports = {
    getAllUsers,
    createClinician,
    createPatient,
    dashboard,
    patientManagement,
    patientInfo,
    addPatient,
    newPatient,
    comment,
}