const express = require('express')
const app = express()
const mainRouter = require('../routes/index')

/* ****************************************************
******************** CONFIG ***************************
******************************************************* */

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


/* ****************************************************
*********************** APP ***************************
******************************************************* */

app.use('/api', mainRouter)


module.exports = app