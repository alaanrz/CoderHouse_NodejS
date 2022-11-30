import {httpServer} from './services/server'
import initMongoDB from '../options/db';

const init = async () => {
    await initMongoDB();
    const PORT = 8080;
    httpServer.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    })
    httpServer.on('error', (error: any) => console.log(`Error en servidor ${error}`));
}

init();