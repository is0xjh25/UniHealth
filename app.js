const exphbs = require('express-handlebars')
const express = require('express')
const flash = require('express-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongooseClient = require('./models')
const passport = require('./passport')
const port = process.env.PORT || 3000
const authRouter = require('./routes/authRouter')
const clinicianRouter = require('./routes/clinicianRouter')
const patientRouter = require('./routes/patientRouter')
const app = express()


app.use(flash())

// Track authenticated users through login sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'keyboard cat', 
        name: 'Uni Health',
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: 'strict',
            httpOnly: true,
            secure: app.get('env') === 'production'
        },
        store: MongoStore.create({ clientPromise: mongooseClient }),
    })
)

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
}

app.use(passport.authenticate('session'))

app.engine(
    'hbs',
    exphbs.engine({
        defaultLayout: 'main',
        extname: 'hbs',
    })
)

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* Routers */
app.use(authRouter)
app.use('/clinician', clinicianRouter)
app.use('/patient', patientRouter)

require('./models/index.js')

app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.listen(port, () => {
    console.log(`Uni Health is listening on port ${port}!`)
    }
)