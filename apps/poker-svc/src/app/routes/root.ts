import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {

  fastify.get('/', async function () {
    const sockets = await fastify.io.fetchSockets();
      console.log('sockets', sockets.length);
      for (const socket of sockets) {
        console.log(socket.id);
        console.log(socket.handshake);
        console.log(socket.rooms);
        console.log(socket.data);
      }
    return { message: 'Hello Agile Poker' };
  
  });

}