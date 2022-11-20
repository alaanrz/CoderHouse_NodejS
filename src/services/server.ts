import express from 'express';
import { Server as HttpServer } from 'http';
import {mainRouter} from '../routes/index';
import path from 'path';
import { initWsServer } from './socket';
import ClientSql from '../../sql'
import knex  from '../../options/db'
import morgan from 'morgan'


const sql = new ClientSql(knex);

const app = express()
const httpServer = new HttpServer(app)

/* ****************************************************
******************** CONFIG ***************************
******************************************************* */
app.use(morgan('dev'))
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


export {httpServer}