import { Router, Request, Response } from 'express';
const router = Router()
import * as carrito from '../carrito';


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
router.delete('/:id', async function (req, res) {
    await carrito.notasDeleteDetalle(parseInt(req.params.id))
    res.json({
        status: 'Ok',
        id: req.params.id
    })
})

export {router}