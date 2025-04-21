import { io, Socket } from 'socket.io-client';
import { PokerCache } from './data/data';
import { Estimate } from './model/Estimate';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  URL,
  {
    autoConnect: true,
  }
);

export interface ServerToClientEvents {
  masterDataChanged: (data: PokerCache) => void;
  estimatesAdded:(tableName: string, estimate: Estimate) => void;
}

export interface ClientToServerEvents {
  dataChanged: (data: PokerCache) => void;
  dataRefresh: () => void;
  estimatesAdded:(tableName: string, estimate: Estimate) => void;
}
