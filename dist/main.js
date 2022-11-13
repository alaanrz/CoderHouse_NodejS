"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./services/server");
const PORT = 8080;
server_1.httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server_1.httpServer.on('error', (error) => console.log(`Error en servidor ${error}`));
