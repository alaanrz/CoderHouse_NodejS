const {Router} = require('express')
const mainRouter = Router()
const notasRouter = require('./notas')


mainRouter.use('/notas', notasRouter)


module.exports = mainRouter