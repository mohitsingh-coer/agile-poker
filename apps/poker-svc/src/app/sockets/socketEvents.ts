import { PokerCache } from "../data/data";
import { Estimate } from "../model/estimate";

export interface ServerToClientEvents {
  masterDataChanged: (data: PokerCache) => void;
  estimatesAdded:(tableName: string, estimate: Estimate) => void;
}

export interface ClientToServerEvents {
  dataChanged: (data: PokerCache) => void;
  dataRefresh: () => void;
  estimatesAdded:(tableName: string, estimate: Estimate) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}