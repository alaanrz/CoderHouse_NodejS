"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const index_1 = require("../routes/index");
const path_1 = __importDefault(require("path"));
const socket_1 = require("./socket");
const app = (0, express_1.default)();
const httpServer = new http_1.Server(app);
exports.httpServer = httpServer;
/* ****************************************************
******************** CONFIG ***************************
******************************************************* */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
const viewsFolderPath = path_1.default.resolve(__dirname, '../../vistas');
app.set('view engine', 'ejs');
app.set('views', viewsFolderPath);
/* ****************************************************
*********************** APP ***************************
******************************************************* */
(0, socket_1.initWsServer)(httpServer);
app.use('/api', index_1.mainRouter);
