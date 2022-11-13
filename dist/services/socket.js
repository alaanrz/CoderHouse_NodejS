"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWsServer = exports.initWsServer = void 0;
const socketIo = require('socket.io');
const notas = require('../notas');
let io;
const initWsServer = (server) => {
    io = socketIo(server);
    io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Se conecto un nuevo usuario....');
        /*     console.log(socket.id)
            console.log(socket.client.id) */
        const notasGet = yield notas.notasGet();
        io.sockets.emit('Notas', notasGet);
    }));
    return io;
};
exports.initWsServer = initWsServer;
const getWsServer = () => {
    return io;
};
exports.getWsServer = getWsServer;
