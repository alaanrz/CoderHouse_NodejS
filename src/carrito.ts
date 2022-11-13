/* En algún momento modificar los metodos de fs usados con Sync por los promises usados con require('node:fs/promises'), siguiendo la documentacion https://nodejs.org/api/fs.html, 
de este modo se evita crear promesas aca ya que los metodos requeridos ya seran promesas en si.
Ademas al no crear promesas aqui, podemos acceder a this.path directamente desde el constructor de Carrito. */
//const fs = require('node:fs/promises')
const fs = require('fs')

class Carrito{
    path: string;

    constructor(path: string){
        this.path = path;
    }

    save = function (nota: { id: number; cantidad: number }, archivo: string) {
        return new Promise(function (resolve, reject) {   
            if (fs.existsSync(archivo)) { 
                    fs.readFile(archivo, 'utf-8', (err: string | undefined, data: string) => {
                        if(err) {
                            reject(err)
                            throw new Error(err)
                        }
                        //todo salió bien
                        const dataObjetc = JSON.parse(data)
                        let carrito : any = {
                            id : dataObjetc.length + 1,
                            notas : nota
                        };
                        dataObjetc.push(carrito)
                        //console.log(dataObjetc)

                        fs.writeFile(archivo, JSON.stringify(dataObjetc), (err: string | undefined) => {
                                if(err) {
                                    reject(err)
                                    throw new Error(err)
                                }
                                //todo salió bien
                                resolve(carrito.id);
                            }
                        )
                    }
                )
            }else{

                let carrito : any = [{
                    id : 1,
                    notas : nota
                }];
                //console.log(carrito)
                fs.writeFile(archivo, JSON.stringify(carrito), (err: string | undefined) => {
                        if(err) {
                            reject(err)
                            throw new Error(err)
                        }
                        //todo salió bien
                        resolve(carrito.id);
                    }
                )
            }
        });
      };

    getAll = async function (archivo: string) {
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
            fs.readFile(archivo, 'utf-8', (err: string | undefined, data: string) => {
                if(err) {
                    reject(err)
                    throw new Error(err)
                }
                //todo salió bien
                const dataObjetc = JSON.parse(data)
                resolve(dataObjetc);
                }
            )
        })
    };

    getById = async function (id: any, archivo: string) {
        return new Promise(async function (resolve, reject) {
                fs.readFile(archivo, 'utf-8', (err: string | undefined, data: string) => {
                        if(err) {
                            reject(err)
                            throw new Error(err)
                        }
                        //todo salió bien
                        const dataObjetc = JSON.parse(data)
                        const notaDetalle = dataObjetc.find((nota: { id: any; }) => nota.id == id)
                        resolve(notaDetalle);
                    }
                )
            });
    };

    deleteById = async function (id: string, archivo: string){
        return new Promise(async function (resolve, reject) {
            fs.readFile(archivo, 'utf-8', (err: string | undefined, data: string) => {
                    if(err) {
                        reject(err)
                        throw new Error(err)
                    }
                    //todo salió bien
                    const dataObjetc = JSON.parse(data)

                    const indexOfObject = dataObjetc.findIndex((object: { id: any; }) => {
                        return object.id === id;
                    });
                    //console.log(dataObjetc);
                    if(indexOfObject != -1){
                        dataObjetc.splice(indexOfObject,1)
                    }
                    //console.log(dataObjetc); return
                    fs.writeFile(archivo, JSON.stringify(dataObjetc), (err: string | undefined) => {
                            if(err) {
                                reject(err)
                                throw new Error(err)
                            }
                            //todo salió bien
                            resolve('Nota eliminada ' + id);
                        }
                    )
                }
            )
        });
    }

    deleteAll = function (archivo: string) {
        return new Promise(function (resolve, reject) {      
            fs.writeFile(archivo, '[]', (err: string | undefined, data: any) => {
                    if(err) {
                        reject(err)
                        throw new Error(err)
                    }
                    //todo salió bien
                    resolve('Las notas fueron eliminadas.');
                }
            )
        });
    };
}

const carrito = new Carrito('./carrito.json')

const nota1 = {
    denominacion : 'River sigue sin poder ganar.',
    contenido : 'Lorem ipsum dolor sit amet sollicitudin risus vulputate natoque lobortis fames.'
}

const nota2 = {
    denominacion : 'La Scaloneta sigue invicta.',
    contenido : 'Lorem ipsum dolor sit amet consectetur adipiscing elit.'
}

const notasPost = async (nota: { id: number; cantidad: number; }) => {
    return await carrito.save(nota, './carrito.json')
    //console.log('Nota guardada Id : ', notaId)
}

const notasGet = () => {
   return carrito.getAll('./carrito.json')
   //console.log('Estas son todas las notas : ', notas)
}

const notasGetDetalle = async (notaId: any) => {
    return await carrito.getById(notaId, './carrito.json')
    //console.log('Tu nota seleccionada : ', notaDetalle)
}

const notasDeleteDetalle = async (notaId: any) => {
    return await carrito.deleteById(notaId, './carrito.json')
    //console.log(notaDeleteDetalle)
}

const notasDelete = async () => {
    let notasDelete = await carrito.deleteAll('./carrito.json')
    console.log(notasDelete)
}

export {  
    notasGet,
    notasPost,
    notasGetDetalle,
    notasDelete,
    notasDeleteDetalle
}