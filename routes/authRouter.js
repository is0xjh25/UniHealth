const passport = require('passport')
const express = require('express')
const router = express.Router()
const clinicianController = require('../controllers/clinicianController')

const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect('/login')
    return next()
}

router.get('/', isAuthenticated, (req, res) => {
    if (req.user.role === 'clinician') {
        res.redirect('/clinician/dashboard')
    } else if (req.user.role === 'patient') {
        res.redirect('/patient/dashboard')
    }
})

// about us
router.get('/about-us', (req, res) => {
    res.render('about-us', { flash: req.flash('error'), title: 'Info' })
})

// about-diabetes
router.get('/about-diabetes', (req, res) => {
    res.render('about-diabetes', { flash: req.flash('error'), title: 'Info' })
})

// login page
router.get('/login', (req, res) => {
    res.render('login-home', { flash: req.flash('error'), title: 'Login' })
})

// login as clinician
router.get('/login-clinician', (req, res) => {
    const message = req.flash('loginMessage')
    res.render('login-clinician', {
        layout: false,
        message: message,
        title: 'Login',
    })
    // res.render('login-clinician', { flash: req.flash('error'), title: 'Login' })
})

router.post(
    '/login-clinician',
    passport.authenticate('clinician-local', {
        successRedirect: '/',
        failureRedirect: '/login-clinician',
        failureFlash: true,
    })
)

// login as patient
router.post(
    '/login-patient',
    passport.authenticate('patient-local', {
        successRedirect: '/',
        failureRedirect: '/login-patient',
        failureFlash: true,
    })
)

router.get('/login-patient', (req, res) => {
    const message = req.flash('loginMessage')
    res.render('login-patient', {
        layout: false,
        message: message,
        title: 'Login',
    })
    // res.render('login-patient', { flash: req.flash('error'), title: 'Login' })
})

router.post('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
})

/* Testint */
// look up all users
router.get('/test-home', clinicianController.getAllUsers)

module.exports = router
