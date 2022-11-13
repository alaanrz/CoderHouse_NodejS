import { Router, Request, Response } from 'express';
const router = Router()
import * as carrito from '../carrito';


router.post('/', async function (req, res) {
    const notasPost = await carrito.notasPost(req.body)
    res.json({ id: notasPost })
})

export {router}