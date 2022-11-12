"use strict";

var express = require('express');
var _require = require('http'),
  HttpServer = _require.Server;
var mainRouter = require('../routes/index');
var path = require('path');
var _require2 = require('./socket'),
  initWsServer = _require2.initWsServer;
var app = express();
var httpServer = new HttpServer(app);

/* ****************************************************
******************** CONFIG ***************************
******************************************************* */

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"]('public'));
var viewsFolderPath = path.resolve(__dirname, '../../vistas');
app.set('view engine', 'ejs');
app.set('views', viewsFolderPath);

/* ****************************************************
*********************** APP ***************************
******************************************************* */

initWsServer(httpServer);
app.use('/api', mainRouter);
module.exports = httpServer;