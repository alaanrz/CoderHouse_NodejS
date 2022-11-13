import { Router, Request, Response } from 'express';
const router = Router()
import * as carrito from '../carrito';


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