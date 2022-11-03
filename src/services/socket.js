const socketIo = require('socket.io');
const notas = require('../notas')
let io;

const initWsServer = (server) => {
  io = socketIo(server);

  io.on('connection', async (socket) => {
    console.log('Se conecto un nuevo usuario....')
/*     console.log(socket.id)
    console.log(socket.client.id) */
    const notasGet = await notas.notasGet()
    io.sockets.emit('Notas', notasGet)
  });

  return io;
};

const getWsServer = () => {
  return io;
}

module.exports = {
  initWsServer,
  getWsServer
};