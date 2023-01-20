import Config from '../config/variables'
import {Request, Response, NextFunction } from 'express';


const authVerification = (req : Request, res: Response, next: NextFunction) =>{
    /* Corroboracion de permisos para acceder al contenido */
    if(!Config.administrador){
        return res.status(401).json({ status: "No estas autorizado." })    
    }
    next()
};
const validateLogIn = (req : Request, res: Response, next: NextFunction) => {
    if (req.session.info && req.session.info.loggedIn) next();
    else res.status(401).json({ msg: 'no estas autorizado' });
};

export {authVerification, validateLogIn}