import { Router } from 'express';
const router = Router()
import {authVerification} from '../middlewares/auth';
import { notasModel } from '../models/notas';

/* 
Desafio Mocks y Normalización:
1) hacer con faker.js 5 datos falsos de notas
2) recuperar aleatoriamente alguno de esos 5 datos mediante un endpoint
3) Endpoint de consulta de todas las notas de MongoDB (ya hecho)
4) Endpoint de normalizacion de consulta de todas las notas de MongoDB:
    Para crear notas "des-normalizadas", agregarles un campo autor que tenga un objeto (Id, Nombre y Apellido) y que se repita en un par de notas.
5) Endpoint de des-normalizacion de consulta de todas las notas de MongoDB

Desafio Log-in por formulario:
    "dependencies": {
        "cookie-parser": "^1.4.5",
        "express": "^4.17.1",
        "express-session": "^1.17.2",
        "session-file-store": "^1.5.0"
    }

 Me quede a los 36 minutos de la clase 32155 - 07/12 - Cookies, Sesiones, Storages - Parte 2 : Redit + NodeJs
*/

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
//const notas = ["pepe","pepito","pipon"];
router.get('/', async function (req, res) {
    //console.log(notas)
    //notas.push("peponsin")
    //console.log(notas)
    try {
        const notas = await notasModel.find();
        res.json({
            data: notas
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
})
router.get('/:id', async function (req, res) {
    try {
        const { id } = req.params;
        const nota = await notasModel.findById(id);
        if(!nota)
            return res.status(404).json({
            msg: 'Nota no encontrada!'
            });

            res.json({
            data: nota,
            })
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
})
router.post('/', authVerification, async function (req, res) {
    try {
        const { denominacion, contenido, autor } = req.body;
        const nuevaNota = await notasModel.create({
            denominacion,
            contenido,
            autor
        });
        res.status(201).json({
            data: nuevaNota,
        })   
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
})
router.post('/createTable', authVerification, async function (req, res) {
     /*   await sql.createTable();
       res.json({status: 'Tabla creada!'}) */
})
router.put('/:id', authVerification, async function (req, res) {
    try {
        const { id } = req.params;
        const { denominacion, contenido } = req.body;

        const nota = await notasModel.findById(id);
        if(!nota)
            return res.status(404).json({
            msg: 'Nota no encontrada!',
            });
        const notaUpdated = await notasModel.findByIdAndUpdate(
            id,
            { denominacion, contenido },
            { new: true }
        );
        res.json({
            msg: 'Nota actualizada',
            data: notaUpdated
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
})
router.delete('/:id', authVerification, async function (req, res) {
    try {
        const { id } = req.params;
        await notasModel.findByIdAndDelete(id);
        res.json({
            msg: 'Nota eliminada!'
        })
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
})

export {router}