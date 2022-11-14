import { Router } from 'express'
const mainRouter = Router()
import {router as routerNotas} from './notas'
import {router as routerCarrito} from './carrito'


mainRouter.use('/notas', routerNotas)
mainRouter.use('/carrito', routerCarrito)



export {  
    mainRouter
  }