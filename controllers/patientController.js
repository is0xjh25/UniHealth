const Patient = require('../models/patient.js')
const DailyRecord = require('../models/dailyRecord.js')

const dashboard = async (req, res, next) => {
	try {
			const patientID = req.session.passport.user
			const patient = await Patient.findById(patientID).lean()
			if (!patient) return res.send("Error: Patient not found")
			const today = new Date().toDateString()
			const record = await DailyRecord.findOne( {$and: [{"_patientID": patientID}, {"date": today}]}).lean()
			return res.render('API-patient', {patient: patient, record: record})
	} catch (err) {
			return next(err)
	}
}

const addData = async (req, res, next) => {
	try {
		const patientID = req.session.passport.user
		const patient = await Patient.findById(patientID)
		if (!patient) return res.send("Error: Patient not found")
		const today = new Date().toDateString()
		const record = await DailyRecord.findOne( {$and: [{"_patientID": patientID}, {"date": today}]})
		if (record) {
			try {
				await record.updateOne({[req.params.type + "Data"]: req.body.data, [req.params.type + "Time"]: new Date(),}, { upsert: true })
				console.log("Update")
				return res.redirect('/patient/dashboard')      
			} catch (err) {
				console.log(err)
				return res.redirect('/patient/dashboard')
			}
		} else {
			try {
				const newRecord = new DailyRecord({
					_patientID: patientID,
					date: today,
					[req.params.type + "Data"]: req.body.data,
					[req.params.type + "Time"]: new Date()
				})
				await newRecord.save()
				await patient.dailyRecords.addToSet(newRecord._id)
				await patient.save()
				console.log("SAVE")
				return res.redirect('/patient/dashboard')      
			} catch (err) {
				console.log(err)
				return res.redirect('/patient/dashboard')
			}
		}			
	} catch (err) {
			return next(err)
	}
}

const addComment = async (req, res, next) => {
	try {
		const patientID = req.session.passport.user
		const patient = await Patient.findById(patientID)
		if (!patient) return res.send("Error: Patient not found")
		const today = new Date().toDateString()
		const record = await DailyRecord.findOne( {$and: [{"_patientID": patientID}, {"date": today}]})
		if (record) {
			try {
				await record.updateOne({[req.params.type + "Comment"]: req.body.data}, { upsert: true })
				console.log("Update")
				return res.redirect('/patient/dashboard')      
			} catch (err) {
				console.log(err)
				return res.redirect('/patient/dashboard')
			}
		} else {
			try {
				const newRecord = new DailyRecord({
					_patientID: patientID,
					date: today,
					[req.params.type + "Comment"]: req.body.data,
				})
				await newRecord.save()
				await patient.dailyRecords.addToSet(newRecord._id)
				await patient.save()
				console.log("SAVE")
				return res.redirect('/patient/dashboard')      
			} catch (err) {
				console.log(err)
				return res.redirect('/patient/dashboard')
			}
		}			
	} catch (err) {
			return next(err)
	}
}

module.exports = {
	dashboard,
	addData,
	addComment
}