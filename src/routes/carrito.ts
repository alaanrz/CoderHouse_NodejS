import { Router, Request, Response, NextFunction } from 'express';
const router = Router()
import * as notas from '../notas';
//import {authVerification} from '../middlewares/auth'



router.get('/', /* authVerification, */ async function (req, res) {
    const notasGet = await notas.notasGet()
    res.json({ notas: notasGet })    
})

export {router}