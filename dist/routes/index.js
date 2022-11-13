"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const mainRouter = (0, express_1.Router)();
exports.mainRouter = mainRouter;
const notas_1 = require("./notas");
mainRouter.use('/notas', notas_1.router);
