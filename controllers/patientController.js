const Patient = require('../models/patient.js')
const DailyRecord = require('../models/dailyRecord.js')

const dashboard = async (req, res) => {
	try {
	 const patientID = req.session.passport.user
	 const patient = await Patient.findById(patientID).lean()
	 const today = new Date().toDateString()
	 const record = await DailyRecord.findOne({$and: [{"_patientID": patientID}, {"date": today}]}).lean()
	 const badge = false
	 let difference = new Date().getTime() - patient.registered.getTime() 
	 let totalDays = Math.ceil(difference / (1000 * 3600 * 24))
	 if (totalDays === 0) totalDays = 1
	 let records = await DailyRecord.find({$and: [{"_patientID": patientID}]}).lean()    
	 //let rate = Math.round(records.length / totalDays * 10000) / 100
	 const rate = 81
	 return res.render('patient-dashboard', {date: today, patient: patient, record: record, rate: rate, message: req.flash('message')})
	} catch (err) {
	 console.log(err)
	 return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
	}
   }

const dashboardByDate = async (req, res) => {
	try {
		const patientID = req.session.passport.user
		const patient = await Patient.findById(patientID).lean()
		const date = new Date(req.params.date).toDateString()
		const record = await DailyRecord.findOne( {$and: [{"_patientID": patientID}, {"date": date}]}).lean()
		return res.render('patient-dashboard', {date: today, patient: patient, record: record})
	} catch (err) {
		console.log(err)
		return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
	}
}

const addData = async (req, res) => {
	try {
		const patientID = req.session.passport.user
		const patient = await Patient.findById(patientID)
		const today = new Date().toDateString()
		const record = await DailyRecord.findOne({$and: [{"_patientID": patientID}, {"date": today}]})
		if (record) {
			await record.updateOne({[req.params.type + "Data"]: req.body.data, [req.params.type + "Time"]: new Date(),}, { upsert: true })
			return res.redirect('/patient/dashboard')      
		} else {
			const newRecord = new DailyRecord({
				_patientID: patientID,
				date: today,
				[req.params.type + "Data"]: req.body.data,
				[req.params.type + "Time"]: new Date()
			})
			await newRecord.save()
			await patient.dailyRecords.addToSet(newRecord._id)
			await patient.save()
			return res.redirect('/patient/dashboard')      
		}			
	} catch (err) {
		console.log(err)
        return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
	}
}

const addComment = async (req, res) => {
	try {
		const patientID = req.session.passport.user
		const patient = await Patient.findById(patientID)
		const today = new Date().toDateString()
		const record = await DailyRecord.findOne( {$and: [{"_patientID": patientID}, {"date": today}]})
		if (record) {
			await record.updateOne({[req.params.type + "Comment"]: req.body.data}, { upsert: true })
		} else {
			const newRecord = new DailyRecord({
				_patientID: patientID,
				date: today,
				[req.params.type + "Comment"]: req.body.data,
			})
			await newRecord.save()
			await patient.dailyRecords.addToSet(newRecord._id)
			await patient.save()
		}
		return res.redirect('/patient/dashboard')      
	} catch (err) {
		console.log(err)
        return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
	}
}

const record = async (req, res) => {
	try {
		const today = new Date().toDateString()
		const patientID = req.session.passport.user
		const record = await DailyRecord.findOne( {$and: [{"_patientID": patientID}, {"date": today}]}).lean()
		return res.render('patient-record', {date: today, record: record})
	} catch (err) {
		console.log(err)
        return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
	}
}

const rank = async (req, res) => {
	try {
	 	const patientID = req.session.passport.user
		const patients = await Patient.find()
		const rank = []
        await Promise.all(
            patients.map(async (p) => {
                let difference = new Date().getTime() - p.registered.getTime() 
				let totalDays = Math.ceil(difference / (1000 * 3600 * 24))
				if (totalDays === 0) totalDays = 1
				let records = await DailyRecord.find({$and: [{"_patientID": p._id}]}).lean()				
				let rate = Math.round(records.length / totalDays * 10000) / 100
				let info = {
					_patientID: p._id,
					username: p.username,
					records: rate
				}
				rank.push(info) 
            })
        )
		rank.sort(({records: a}, {records: b}) => b - a)
	 	return res.render('patient-rank', {rank: rank})
	} catch (err) {
		console.log(err)
        return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
	}
}

const profile = async (req, res) => {
	try {
		const patientID = req.session.passport.user
		const patient = await Patient.findById(patientID).lean()
		return res.render('patient-profile', {patient: patient})
	} catch (err) {
		console.log(err)
		return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
	}
}
 
const resetPassword = async (req, res) => {
	try {
    	const patientID = req.session.passport.user._id
		const patient = await Patient.findById(patientID)
        console.log(req.body.oldPassword)
        console.log(req.body.newPassword)
        console.log(req.body.confirmPassword)
    	// const newPassword = patient.generateHash(req.body.password)
    	// await Patient.findByIdAndUpdate(patientID,{$set:{"password":newPassword}})		
		return res.render('patient-info', {patient: patient})
	} catch (err) {
		console.log(err)
    	return res.status(500).render('error', {errorCode: '500', message: 'Internal Server Error'})
	}
}
 
module.exports = {
	dashboard,
	dashboardByDate,
	addData,
	addComment,
	record,
	rank,
	profile,
	resetPassword,
}