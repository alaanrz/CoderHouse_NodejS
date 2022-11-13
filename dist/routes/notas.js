"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
const notas = __importStar(require("../notas"));
const socket_1 = require("../services/socket");
/* ****************************************************
************** ESTRUCTURA OBJETO NOTA *****************
******************************************************* */
/*
[{
  "denominacion" : "River sigue sin poder ganar.",
  "contenido" : "Lorem ipsum dolor sit amet sollicitudin risus vulputate natoque lobortis fames.",
  "id" : 1
},
{
  "denominacion" : "La Scaloneta sigue invicta.",
  "contenido" : "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  "id" : 2
},
{
  "denominacion" : "Se retiró Roger Federer.",
  "contenido" : "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  "id" : 3
}]
*/
/* ****************************************************
******************** ROUTER ***************************
******************************************************* */
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const notasGet = yield notas.notasGet();
        /* res.json({ notas: notasGet }) */
        //console.log({notasGet})
        res.render('notas', { notasGet });
    });
});
router.get('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const notasGetDetalle = yield notas.notasGetDetalle(req.params.id);
        if (!notasGetDetalle) {
            res.status(404).json({ error: 'Nota no encontrada!' });
        }
        else {
            res.json({ notas: notasGetDetalle });
        }
    });
});
router.post('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const notasPost = yield notas.notasPost(req.body);
        const io = (0, socket_1.getWsServer)();
        const notasGetDetalle = yield notas.notasGetDetalle(notasPost);
        io.sockets.emit('NotasCliente', notasGetDetalle);
        res.json({ id: notasPost });
    });
});
router.put('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const notasGet = yield notas.notasGet();
        const notaEncontrada = notasGet.findIndex((nota) => {
            return nota.id === parseInt(req.params.id);
        });
        if (notaEncontrada != -1) {
            notasGet[notaEncontrada].denominacion = req.body.denominacion;
            notasGet[notaEncontrada].contenido = req.body.contenido;
        }
        yield notas.notasDelete();
        for (let index = 0; index < notasGet.length; index++) {
            const element = notasGet[index];
            yield notas.notasPost(element);
        }
        res.json({
            status: 'Ok',
            id: req.params.id,
            nuevo: req.body
        });
    });
});
router.delete('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield notas.notasDeleteDetalle(parseInt(req.params.id));
        res.json({
            status: 'Ok',
            id: req.params.id
        });
    });
});
