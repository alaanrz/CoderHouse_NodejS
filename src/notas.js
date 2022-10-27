/* En algún momento modificar los metodos de fs usados con Sync por los promises usados con require('node:fs/promises'), siguiendo la documentacion https://nodejs.org/api/fs.html, 
de este modo se evita crear promesas aca ya que los metodos requeridos ya seran promesas en si.
Ademas al no crear promesas aqui, podemos acceder a this.path directamente desde el constructor de Contenedor. */
//const fs = require('node:fs/promises')
const fs = require('fs')

class Contentedor{

    constructor(path){
        this.path = path;
    }

    save = function (nota, archivo) {
        return new Promise(function (resolve, reject) {   
            if (fs.existsSync(archivo)) { 
                    fs.readFile(archivo, 'utf-8', (err, data) => {
                        if(err) {
                            reject(err)
                            throw new Error(err)
                        }
                        //todo salió bien
                        const dataObjetc = JSON.parse(data)
                        nota.id = dataObjetc.length + 1
                        dataObjetc.push(nota)
                        fs.writeFile(archivo, JSON.stringify(dataObjetc), (err) => {
                                if(err) {
                                    reject(err)
                                    throw new Error(err)
                                }
                                //todo salió bien
                                resolve(nota.id);
                            }
                        )
                    }
                )
            }else{
                let dataObjetc = []
                nota.id = 1
                dataObjetc[0] = nota

                fs.writeFile(archivo, JSON.stringify(dataObjetc), (err) => {
                        if(err) {
                            reject(err)
                            throw new Error(err)
                        }
                        //todo salió bien
                        resolve(nota.id);
                    }
                )
            }
        });
      };

    getAll = async function (archivo) {
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

    getById = async function (id, archivo) {
        return new Promise(async function (resolve, reject) {
                fs.readFile(archivo, 'utf-8', (err, data) => {
                        if(err) {
                            reject(err)
                            throw new Error(err)
                        }
                        //todo salió bien
                        const dataObjetc = JSON.parse(data)
                        const notaDetalle = dataObjetc.find(nota => nota.id == id)
                        resolve(notaDetalle);
                    }
                )
            });
    };

    deleteById = async function (id, archivo){
        return new Promise(async function (resolve, reject) {
            fs.readFile(archivo, 'utf-8', (err, data) => {
                    if(err) {
                        reject(err)
                        throw new Error(err)
                    }
                    //todo salió bien
                    const dataObjetc = JSON.parse(data)
                    const indexOfObject = dataObjetc.findIndex(object => {
                        return object.id === id;
                    });
                    if(indexOfObject != -1){
                        dataObjetc.splice(indexOfObject,1)
                    }
                    //console.log(dataObjetc); return
                    fs.writeFile(archivo, JSON.stringify(dataObjetc), (err) => {
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

    deleteAll = function (archivo) {
        return new Promise(function (resolve, reject) {      
            fs.writeFile(archivo, '[]', (err, data) => {
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

const contenedor = new Contentedor('./notas.json')

const nota1 = {
    denominacion : 'River sigue sin poder ganar.',
    contenido : 'Lorem ipsum dolor sit amet sollicitudin risus vulputate natoque lobortis fames.'
}

const nota2 = {
    denominacion : 'La Scaloneta sigue invicta.',
    contenido : 'Lorem ipsum dolor sit amet consectetur adipiscing elit.'
}

const notasPost = async (nota) => {
    return await contenedor.save(nota, './notas.json')
    //console.log('Nota guardada Id : ', notaId)
}

const notasGet = () => {
   return contenedor.getAll('./notas.json')
   //console.log('Estas son todas las notas : ', notas)
}

const notasGetDetalle = async (notaId) => {
    return await contenedor.getById(notaId, './notas.json')
    //console.log('Tu nota seleccionada : ', notaDetalle)
}

const notasDeleteDetalle = async (notaId) => {
    return await contenedor.deleteById(notaId, './notas.json')
    //console.log(notaDeleteDetalle)
}

const notasDelete = async () => {
    let notasDelete = await contenedor.deleteAll('./notas.json')
    console.log(notasDelete)
}

/* EJECUCIONES */

const notasEjecucionCompleta = async () => {

    await notasPost(nota1)

    await notasPost(nota2)

    await notasGet()

}

//notasEjecucionCompleta()


module.exports = {
    notasGet,
    notasPost,
    notasGetDetalle,
    notasDelete,
    notasDeleteDetalle
};