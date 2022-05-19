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


passport.use('clinician-local', new LocalStrategy({
 usernameField : 'email', 
 passwordField : 'password',
 passReqToCallback : true}, // pass the req as the first arg to the callback for verification 
function(req, email, password, done) {

 process.nextTick(function() {
  // see if the user with the email exists
  Clinician.findOne({'email' :  email }, function(err, user) {
   // if there are errors, user is not found or password
   // does match, send back errors
   if (err)
    return done(err);
   if (!user){
    return done(null, false, req.flash('loginMessage', 'Account not found'))
   };
   if (!user.verifyPassword(password)){
    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
   }
   // otherwise, we put the user's email in the session
   else {
    req.session.email=email       
    // done() is used by the strategy to set the authentication status with details of the user who was authenticated
    return done(null, user, null);
   }
  });
 });
}));

// passport.use('patient-local', 
//  new LocalStrategy({ 
//   usernameField: 'email', 
//   passwordField: 'password',
//   passReqToCallback : true,
//  }, 
//  // pass the req as the first arg to the callback for verification 
//  (req, email, password, done) => {
//   Patient.findOne({ 'email': email }, {}, {}, (err, user) => { 
//    if (err) return done(undefined, false, { message: 'Unknown error has occurred' })
//    // if (!user) return done(undefined, false, { message: 'Account not found' })
//    if (!user) return done(undefined, false, req.flash("loginMessage", 'Account not found' ))
//    user.verifyPassword(password, (err, valid) => { 
//     if (err) return done(undefined, false, { message: 'Unknown error has occurred' })
//     // if (!valid) return done(undefined, false, { message: 'Incorrect password' })
//     if (!valid) return done(undefined, false, req.flash("loginMessage", 'Incorrect password' ))
//     // return done(undefined, user)
//    })
//   });
//  })
// )

passport.use('patient-local', new LocalStrategy({
 usernameField : 'email', 
 passwordField : 'password',
 passReqToCallback : true}, // pass the req as the first arg to the callback for verification 
function(req, email, password, done) {

 process.nextTick(function() {
  // see if the user with the email exists
  Patient.findOne({ 'email' :  email }, function(err, user) {
   // if there are errors, user is not found or password
   // does match, send back errors
   if (err)
    return done(err);
   if (!user){
    return done(null, false, req.flash('loginMessage', 'Account not found'))
   };
   if (!user.verifyPassword(password)){
    // false in done() indicates to the strategy that authentication has
    // failed
    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
   }
   // otherwise, we put the user's email in the session
   else {
    req.session.email=email       
    // done() is used by the strategy to set the authentication status with details of the user who was authenticated
    return done(null, user, null);
   }
  });
 });
}));

module.exports = passport