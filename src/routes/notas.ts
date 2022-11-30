import { Router } from 'express';
const router = Router()
import {authVerification} from '../middlewares/auth';
import { notasModel } from '../models/notas';


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
        const { denominacion, contenido } = req.body;
        const nuevaNota = await notasModel.create({
            denominacion,
            contenido
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