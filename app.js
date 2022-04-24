const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 3000
var path = require('path')
app.use(express.static(path.join(__dirname, '/')))

/* Genral */
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/about-us', (req, res) => {
    res.sendFile(__dirname + '/static/' + 'about-us.html')
})

app.get('/about-diabetes', (req, res) => {
    res.sendFile(__dirname + '/static/' + 'about-diabetes.html')
})

/* Clinician */

/* Port Listen */
app.listen(process.env.PORT || 3000, () => {
	console.log('The library app is running!')
})