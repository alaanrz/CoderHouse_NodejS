import express from 'express';
import { Server as HttpServer } from 'http';
import {mainRouter} from '../routes/index';
import path from 'path';
import { initWsServer } from './socket';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
type Info = {
  loggedIn: boolean,
  contador : number,
  username : string,
  admin : boolean,
};
// Augment express-session with a custom SessionData object
declare module "express-session" {
  interface SessionData {
    info: Info;
  }
}
import MongoStore from 'connect-mongo';

/* NOTA : esta llamada a dontenv ya se hace en /options/db, se debe unificar ambas llamadas, no tiene sentido hacer dos veces la misma llamada, ademas de que 
    en /options/db se hace un condicional OR para decidir a que base de datos conectarse (MongoAtlas || MongoLocal).
*/
import dotenv from 'dotenv';
dotenv.config();

const StoreOptions = {
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_ATLAS,
      ttl: 180000, // default : 14 dias
      autoRemove: 'native', //'interval'
      // autoRemoveInterval: 1000
      crypto: {
        secret: '1234',    
      },
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 180000,
    }
  };

const app = express()
const httpServer = new HttpServer(app)

/* ****************************************************
******************** CONFIG ***************************
******************************************************* */
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(session(StoreOptions));

const viewsFolderPath = path.resolve(__dirname, '../../vistas')
app.set('view engine', 'ejs')
app.set('views', viewsFolderPath)


/* ****************************************************
*********************** APP ***************************
******************************************************* */

initWsServer(httpServer)

app.use('/api', mainRouter)


export {httpServer}