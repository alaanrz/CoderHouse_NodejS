import { Router } from 'express';
const router = Router()
import {authVerification} from '../middlewares/auth';
import { notasModel } from '../models/notas';
import { faker } from '@faker-js/faker';
import { normalize, schema, denormalize } from 'normalizr';

/* 
Desafio Mocks y Normalización:
1) hacer con faker.js 5 datos falsos de notas
2) recuperar aleatoriamente alguno de esos 5 datos mediante un endpoint
3) Endpoint de consulta de todas las notas de MongoDB (ya hecho)
4) Endpoint de normalizacion de consulta de todas las notas de MongoDB:
    Para crear notas "des-normalizadas", agregarles un campo autor que tenga un objeto (Id, Nombre y Apellido) y que se repita en un par de notas.
5) Endpoint de des-normalizacion de consulta de todas las notas de MongoDB

Desafio Log-in por formulario:
1) Guardar sesiones con MongoStore (connect-mongo) + MongoAtlas
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
const notas: Array<{}> = [];
router.get('/faker', async function (req, res) {
    for (let index = 0; index < 10; index++) {
        notas.push({
            id: faker.datatype.uuid(),
            denominacion: faker.lorem.paragraph(),
            contenido: faker.lorem.paragraph()
        })
    }
    res.json({
        data: notas
    });
})
router.get('/faker/aleatorio', async function (req, res) {
    const nota = notas[Math.floor(Math.random() * notas.length)];
    res.json({
        data: nota
    });
})

router.get('/', async function (req, res) {
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


/* ****************************************************
*************** ↧↧↧ NORMALIZACION ↧↧↧ *******************
******************************************************* */
router.get('/normailizacion', async function (req, res) {
 /* Pendiente... */
})
/* ****************************************************
************* ↥↥↥ NORMALIZACION ↥↥↥ ********************
******************************************************* */
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