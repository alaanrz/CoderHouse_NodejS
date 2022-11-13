import { Router, Request, Response } from 'express';
const router = Router()
import * as carrito from '../carrito';
const fs = require('node:fs/promises')


router.get('/:id', async function (req, res) {
    const notasGetDetalle = await carrito.notasGetDetalle(req.params.id)
    if (!notasGetDetalle) {
        res.status(404).json({ error: 'Nota no encontrada!' })
    } else {
        res.json({ notas: notasGetDetalle })
    }
})
router.post('/', async function (req, res) {
    const notasPost = await carrito.notasPost(req.body)
    res.json({ id: notasPost })
})
router.put('/:id', async function (req, res) {
    const notasGet : any = await carrito.notasGet()
    const notaEncontrada = notasGet.findIndex((nota: any) => {
        return nota.id === parseInt(req.params.id);
    });

    if (notaEncontrada != -1) {
        notasGet[notaEncontrada].notas.push(req.body)
    }

    //console.log(notasGet);return
    await carrito.notasDelete()
    
    try {
        await fs.writeFile('./carrito.json',  JSON.stringify(notasGet));
        res.json({
            status: 'Ok',
            id: req.params.id,
            nuevo: req.body
        })
    } catch (err) {
        res.json({
            status: err,
        })
    }
})
router.delete('/:id', async function (req, res) {
    await carrito.notasDeleteDetalle(parseInt(req.params.id))
    res.json({
        status: 'Ok',
        id: req.params.id
    })
})

export {router}