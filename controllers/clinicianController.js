const Clinician = require('../models/clinician.js')

const getClinicianByEmail = async (req, res, next) => {
    try {
        const clinician = await Clinician.findOne({
            email: req.params.clinician_email,
        }).lean()
        if (!clinician) return res.sendStatus(404)
        res.send(clinician)
    } catch (err) {
        return next(err)
    }
}

const createClinician = async (req, res, next) => {
    try {
        newClinician = new Clinician(req.body)
        await newClinician.save()
        res.send(newClinician)
    } catch (err) {
        return next(err)
    }
}

const addPatient = async (req, res, next) => {
    try {
        newClinician = new Clinician(req.body)
        await newClinician.save()
        res.send(newClinician)
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getClinicianByEmail,
    createClinician,
    addPatient,
}
