import * as path from 'path';
import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import fastifySocketIO from './sockets/socketIo'
import * as socketEvents from './sockets/socketEvents'
import { Server } from 'socket.io';


/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });
  
  fastify.register(fastifySocketIO)

}

declare module 'fastify' {
  interface FastifyInstance {
    io: Server<socketEvents.ClientToServerEvents, socketEvents.ServerToClientEvents, socketEvents.InterServerEvents, socketEvents.SocketData>;
  }
}