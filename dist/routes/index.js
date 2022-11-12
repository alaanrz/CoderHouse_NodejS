"use strict";

var _require = require('express'),
  Router = _require.Router;
var mainRouter = Router();
var notasRouter = require('./notas');
mainRouter.use('/notas', notasRouter);
module.exports = mainRouter;