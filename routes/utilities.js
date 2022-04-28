// middleware to ensure user is logged in
function isLoggedInPatient(req, res, next) {
	if (req.isAuthenticated()){
			if(req.session.passport.user.role === 'patient'){
					return next();
			}
	}
	return res.redirect('/login')
}

function isLoggedInClinician(req, res, next) {
	if (req.isAuthenticated()){
			if(req.session.passport.user.role === 'clinician'){
					return next();
			}
	}
	return res.redirect('/login')
}

module.exports = {
	isLoggedInPatient,
	isLoggedInClinician
}