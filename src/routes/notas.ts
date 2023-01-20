import { Router } from 'express';
const router = Router()
import {authVerification, validateLogIn} from '../middlewares/auth';
import { notasModel } from '../models/notas';
import { faker } from '@faker-js/faker';
import { normalize, schema, denormalize } from 'normalizr';

/* 
Desafio Mocks y Normalización:
1) hacer con faker.js 5 datos falsos de notas ✔
2) recuperar aleatoriamente alguno de esos 5 datos mediante un endpoint ✔
3) Endpoint de consulta de todas las notas de MongoDB (ya hecho)✔
4) Endpoint de normalizacion de consulta de todas las notas de MongoDB:✘
    Para crear notas "des-normalizadas", agregarles un campo autor que tenga un objeto (Id, Nombre y Apellido) y que se repita en un par de notas.
5) Endpoint de des-normalizacion de consulta de todas las notas de MongoDB✘

Desafio Log-in por formulario:
1) Guardar sesiones con MongoStore (connect-mongo) + MongoAtlas
    Verificar que en los reinicios del servidor, no se pierdan las sesiones activas de los clientes.✔
    Mediante el cliente web de Mongo Atlas, revisar los id de sesión correspondientes a cada cliente y sus datos.✔
    Borrar una sesión de cliente en la base y comprobar que en el próximo request al usuario se le presente la vista de login.✔
    Fijar un tiempo de expiración de sesión de 10 minutos recargable con cada visita del cliente al sitio y verificar que si pasa ese tiempo de inactividad el cliente quede deslogueado.✘
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
*************** ROUTER SESSIONES **********************
*************** (pasar a index.ts o en su defecto crear una nueva route que sea users o auth) ******************** */
const users = [
    {
        username: 'juan',
        password : '1234',
        admin: true,
    },
    {
        username: 'jose',
        password : '123456',
        admin: false,
    }
];

router.post('/login', async (req, res) => {
    //res.json(req.session);return;
    //res.json(req.body);return;
    const { username, password } = req.body;
    const index = users.findIndex((aUser) => aUser.username === username && aUser.password === password);

    if(index < 0)
        res.status(401).json({ msg: 'no estas autorizado' });
    else {
        const user = users[index];
        req.session.info = {
        loggedIn: true,
        contador : 1,
        username : user.username,
        admin : user.admin,
        };
        res.json({msg: 'Bienvenido!!', sesion: req.session});
    }
});
router.get('/secret-endpoint', validateLogIn, async (req, res) => {
    if(req.session.info){
        req.session.info.contador++;
        res.json({
            msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
        });
    };
});
router.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
      if (!err) res.send('Logout ok!');
      else res.send({ status: 'Logout ERROR', body: err });
    });
});
router.get('/info', validateLogIn, async (req, res) => {
    res.send({
      session: req.session,
      sessionId: req.sessionID,
      cookies: req.cookies,
    });
});
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