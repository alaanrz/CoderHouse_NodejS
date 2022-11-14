const socketIo = require('socket.io');
const notas = require('../notas')
let io: { on: (arg0: string, arg1: (socket: any) => Promise<void>) => void; sockets: { emit: (arg0: string, arg1: any) => void; }; };

const initWsServer = (server: any) => {
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

export {  
  initWsServer,
  getWsServer
}