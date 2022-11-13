import { Router } from 'express'
const mainRouter = Router()
import {router} from './notas'


mainRouter.use('/notas', router)


export {  
    mainRouter
  }