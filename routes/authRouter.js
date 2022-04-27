const passport = require('passport')
const express = require('express')
const router = express.Router()

const clinicianController = require('../controllers/clinicianController')

const isAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.redirect('/login') 
	}
	return next() 
}

router.get('/', isAuthenticated, (req, res) => {
	if (req.user.role === 'clinician') {
		res.redirect('/clinician/dashboard')
	} else if (req.user.role === 'patient') {
		res.redirect('/patient/dashboard')
	} 
})

// look up all users
router.get('/api-home', clinicianController.getAllUsers)

// login page
router.get('/login', (req, res) => {
	res.render('API-login', { flash: req.flash('error'), title: 'Login' })
})

// login as clinician
router.post('/login-clinician',
  passport.authenticate('clinician-local', {
		successRedirect: '/', failureRedirect: '/login', failureFlash: true 
	})
)

// login as patient
router.post('/login-patient',
  passport.authenticate('patient-local', {
		successRedirect: '/', failureRedirect: '/login', failureFlash: true 
	})
)

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router