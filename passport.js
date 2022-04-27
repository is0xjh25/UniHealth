const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Clinician = require('./models/clinician')
const Patient = require('./models/patient')
const USER = { id: 123, email:'user@gmail.com', username: 'user', password: 'password', secret: 'info30005' }

passport.serializeUser((user, done) => {
	// Use id to serialize user
	done(undefined, {_id: user.id, role: user.role}) 
})
		
passport.deserializeUser((user, done) => {
	if (user.role === 'clinician') {
		Clinician.findById(user, function (err, clinician) {
			if (clinician) return done(null, clinician);
			return done(err, { message: 'Clinician not found' })
		});
	} else if (user.role === 'patient') {
		Patient.findById(user, (err, patient) => {
			if (patient) return done(null, patient);
			return done(err, { message: 'Patient not found' })
		});
	} else {
		done({ message: 'No entity found' }, null);
	}
});

passport.use('clinician-local', 
	new LocalStrategy({ 
		usernameField: 'email', 
		passwordField: 'password'
	}, // pass the req as the first arg to the callback for verification 
	(email, password, done) => {
		Clinician.findOne({ 'email': email }, {}, {}, (err, user) => { 
			if (err) return done(undefined, false, { message: 'Unknown error has occurred' })
			if (!user) return done(undefined, false, { message: 'Account not found' })
			user.verifyPassword(password, (err, valid) => { 
				if (err) return done(undefined, false, { message: 'Unknown error has occurred' })
				if (!valid) return done(undefined, false, { message: 'Incorrect password' })
				return done(undefined, user)
			})
		})
	})
)

passport.use('patient-local', 
	new LocalStrategy({ 
		usernameField: 'email', 
		passwordField: 'password'
	}, // pass the req as the first arg to the callback for verification 
	(email, password, done) => {
		Patient.findOne({ 'email': email }, {}, {}, (err, user) => { 
			if (err) return done(undefined, false, { message: 'Unknown error has occurred' })
			if (!user) return done(undefined, false, { message: 'Account not found' })
			user.verifyPassword(password, (err, valid) => { 
				if (err) return done(undefined, false, { message: 'Unknown error has occurred' })
				if (!valid) return done(undefined, false, { message: 'Incorrect password' })
				return done(undefined, user)
			})
		})
	})
)

module.exports = passport