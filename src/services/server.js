const express = require('express')
const app = express()
const mainRouter = require('../routes/index')
const path = require('path')

/* ****************************************************
******************** CONFIG ***************************
******************************************************* */

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const viewsFolderPath = path.resolve(__dirname, '../../vistas')
app.set('view engine', 'ejs')
app.set('views', viewsFolderPath)


/* ****************************************************
*********************** APP ***************************
******************************************************* */

app.use('/api', mainRouter)


module.exports = app