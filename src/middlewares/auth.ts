import Config from '../config/variables'
import {Request, Response, NextFunction } from 'express';


const authVerification = (req : Request, res: Response, next: NextFunction) =>{
    /* Corroboracion de permisos para acceder al contenido */
    if(!Config.administrador){
        return res.status(401).json({ status: "No estas autorizado." })    
    }
    next()
}

export {authVerification}