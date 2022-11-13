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
exports.notasDeleteDetalle = exports.notasDelete = exports.notasGetDetalle = exports.notasPost = exports.notasGet = void 0;
/* En algún momento modificar los metodos de fs usados con Sync por los promises usados con require('node:fs/promises'), siguiendo la documentacion https://nodejs.org/api/fs.html,
de este modo se evita crear promesas aca ya que los metodos requeridos ya seran promesas en si.
Ademas al no crear promesas aqui, podemos acceder a this.path directamente desde el constructor de Contenedor. */
//const fs = require('node:fs/promises')
const fs = require('fs');
class Contentedor {
    constructor(path) {
        this.save = function (nota, archivo) {
            return new Promise(function (resolve, reject) {
                if (fs.existsSync(archivo)) {
                    fs.readFile(archivo, 'utf-8', (err, data) => {
                        if (err) {
                            reject(err);
                            throw new Error(err);
                        }
                        //todo salió bien
                        const dataObjetc = JSON.parse(data);
                        nota.id = dataObjetc.length + 1;
                        dataObjetc.push(nota);
                        fs.writeFile(archivo, JSON.stringify(dataObjetc), (err) => {
                            if (err) {
                                reject(err);
                                throw new Error(err);
                            }
                            //todo salió bien
                            resolve(nota.id);
                        });
                    });
                }
                else {
                    let dataObjetc = [];
                    nota.id = 1;
                    dataObjetc[0] = nota;
                    fs.writeFile(archivo, JSON.stringify(dataObjetc), (err) => {
                        if (err) {
                            reject(err);
                            throw new Error(err);
                        }
                        //todo salió bien
                        resolve(nota.id);
                    });
                }
            });
        };
        this.getAll = function (archivo) {
            return __awaiter(this, void 0, void 0, function* () {
                /* METODO CON PROMESA DESDE EL MISMO FS PROMISES
                try {
                    console.log(this.path)
                    const contents = await fs.readFile(this.path, { encoding: 'utf8' });
                    const dataObjetc = JSON.parse(contents)
                    return dataObjetc;
                  } catch (err) {
                    throw new Error(err)
                  } */
                return new Promise(function (resolve, reject) {
                    fs.readFile(archivo, 'utf-8', (err, data) => {
                        if (err) {
                            reject(err);
                            throw new Error(err);
                        }
                        //todo salió bien
                        const dataObjetc = JSON.parse(data);
                        resolve(dataObjetc);
                    });
                });
            });
        };
        this.getById = function (id, archivo) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise(function (resolve, reject) {
                    return __awaiter(this, void 0, void 0, function* () {
                        fs.readFile(archivo, 'utf-8', (err, data) => {
                            if (err) {
                                reject(err);
                                throw new Error(err);
                            }
                            //todo salió bien
                            const dataObjetc = JSON.parse(data);
                            const notaDetalle = dataObjetc.find((nota) => nota.id == id);
                            resolve(notaDetalle);
                        });
                    });
                });
            });
        };
        this.deleteById = function (id, archivo) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise(function (resolve, reject) {
                    return __awaiter(this, void 0, void 0, function* () {
                        fs.readFile(archivo, 'utf-8', (err, data) => {
                            if (err) {
                                reject(err);
                                throw new Error(err);
                            }
                            //todo salió bien
                            const dataObjetc = JSON.parse(data);
                            const indexOfObject = dataObjetc.findIndex((object) => {
                                return object.id === id;
                            });
                            if (indexOfObject != -1) {
                                dataObjetc.splice(indexOfObject, 1);
                            }
                            //console.log(dataObjetc); return
                            fs.writeFile(archivo, JSON.stringify(dataObjetc), (err) => {
                                if (err) {
                                    reject(err);
                                    throw new Error(err);
                                }
                                //todo salió bien
                                resolve('Nota eliminada ' + id);
                            });
                        });
                    });
                });
            });
        };
        this.deleteAll = function (archivo) {
            return new Promise(function (resolve, reject) {
                fs.writeFile(archivo, '[]', (err, data) => {
                    if (err) {
                        reject(err);
                        throw new Error(err);
                    }
                    //todo salió bien
                    resolve('Las notas fueron eliminadas.');
                });
            });
        };
        this.path = path;
    }
}
const contenedor = new Contentedor('./notas.json');
const nota1 = {
    denominacion: 'River sigue sin poder ganar.',
    contenido: 'Lorem ipsum dolor sit amet sollicitudin risus vulputate natoque lobortis fames.'
};
const nota2 = {
    denominacion: 'La Scaloneta sigue invicta.',
    contenido: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.'
};
const notasPost = (nota) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contenedor.save(nota, './notas.json');
    //console.log('Nota guardada Id : ', notaId)
});
exports.notasPost = notasPost;
const notasGet = () => {
    return contenedor.getAll('./notas.json');
    //console.log('Estas son todas las notas : ', notas)
};
exports.notasGet = notasGet;
const notasGetDetalle = (notaId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contenedor.getById(notaId, './notas.json');
    //console.log('Tu nota seleccionada : ', notaDetalle)
});
exports.notasGetDetalle = notasGetDetalle;
const notasDeleteDetalle = (notaId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contenedor.deleteById(notaId, './notas.json');
    //console.log(notaDeleteDetalle)
});
exports.notasDeleteDetalle = notasDeleteDetalle;
const notasDelete = () => __awaiter(void 0, void 0, void 0, function* () {
    let notasDelete = yield contenedor.deleteAll('./notas.json');
    console.log(notasDelete);
});
exports.notasDelete = notasDelete;
/* EJECUCIONES */
const notasEjecucionCompleta = () => __awaiter(void 0, void 0, void 0, function* () {
    yield notasPost(nota1);
    yield notasPost(nota2);
    yield notasGet();
});
