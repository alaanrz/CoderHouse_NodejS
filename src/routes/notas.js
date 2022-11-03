const {Router} = require('express')
const router = Router()
const notas = require('../notas')
const { getWsServer } = require('../services/socket');

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
    const notasGet = await notas.notasGet()
    /* res.json({ notas: notasGet }) */
    //console.log({notasGet})
    res.render('notas', {notasGet})
})
router.get('/:id', async function (req, res) {
    const notasGetDetalle = await notas.notasGetDetalle(req.params.id)
    if (!notasGetDetalle) {
        res.status(404).json({ error: 'Nota no encontrada!' })
    } else {
        res.json({ notas: notasGetDetalle })
    }
})
router.post('/', async function (req, res) {
    const notasPost = await notas.notasPost(req.body)
    const io = getWsServer()
    const notasGetDetalle = await notas.notasGetDetalle(notasPost)
    io.sockets.emit('NotasCliente', notasGetDetalle)
    res.json({ id: notasPost })
})
router.put('/:id', async function (req, res) {
    const notasGet = await notas.notasGet()
    const notaEncontrada = notasGet.findIndex(nota => {
        return nota.id === parseInt(req.params.id);
    });
    if (notaEncontrada != -1) {
        notasGet[notaEncontrada].denominacion = req.body.denominacion
        notasGet[notaEncontrada].contenido = req.body.contenido
    }
    await notas.notasDelete()
    for (let index = 0; index < notasGet.length; index++) {
        const element = notasGet[index];
        await notas.notasPost(element)
    }

    res.json({
        status: 'Ok',
        id: req.params.id,
        nuevo: req.body
    })
})
router.delete('/:id', async function (req, res) {
    await notas.notasDeleteDetalle(parseInt(req.params.id))
    res.json({
        status: 'Ok',
        id: req.params.id
    })
})

module.exports = router