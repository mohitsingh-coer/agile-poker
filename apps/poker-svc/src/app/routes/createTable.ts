import { FastifyInstance } from 'fastify';

export function handleHello(message: string) {
  console.log('message received: ' + message);
}

export default async function (fastify: FastifyInstance) {
  fastify.ready((err) => {
    if (err) throw err;
    fastify.io.on('connection', (socket) => {
      console.info('Socket connected!', socket.id);
      socket.on('dataChanged', (data) => {
        console.log('dataChanged', data);
        fastify.io.emit('masterDataChanged', data);
      });
      socket.on('estimatesAdded', (tableName, estimate) => {
        console.log('estimatesAdded', tableName, estimate);
        fastify.io.emit('estimatesAdded', tableName, estimate);
      });
    });
  });
}


