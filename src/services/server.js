const express = require('express')
const { Server: HttpServer } = require('http')
const mainRouter = require('../routes/index')
const path = require('path')
const { initWsServer } = require('./socket');



const app = express()
const httpServer = new HttpServer(app)

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

initWsServer(httpServer)

app.use('/api', mainRouter)


module.exports = httpServer