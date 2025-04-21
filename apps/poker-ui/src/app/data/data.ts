import { Table, Estimate } from "../model/Estimate";


export class PokerCache {
  constructor(public tables: Table[] = []) {}

  static fromJSON(data: any): PokerCache {
    const tables = data.tables.map((t: any) => 
      new Table(t.name, t.owner,t.estimates?.map((e: any) => 
        new Estimate(e.userName, e.points)
      ))
    );
    return new PokerCache(tables);
  }
}

const localStorageName = 'pokerCache';

export function addTable(name: string, owner: string): boolean {
  const pokerCache: PokerCache = exportDataWithoutMethods();
  if (pokerCache.tables.some(table => (table.name === name && table.owner === owner))) {
    return false;
  }
  pokerCache.tables.push(new Table(name, owner));
  localStorage.setItem(localStorageName, JSON.stringify(pokerCache));
  return true;
}

export const exportDataWithoutMethods = (): PokerCache => {
  const currentState = localStorage.getItem(localStorageName);
  let pokerCache: PokerCache;
  if (currentState == null) {
    pokerCache = JSON.parse(JSON.stringify(new PokerCache()));
  } else {
    pokerCache = JSON.parse(currentState);
  }
  return pokerCache;
}

export const exportDataAsObject = (): PokerCache => {
    const pokerCache: PokerCache = exportDataWithoutMethods();
    const pokerCacheObject: PokerCache = new PokerCache();
    pokerCacheObject.tables = pokerCache.tables.map((table: Table) => {
      const tableObject = new Table(table.name, table.owner);
      tableObject.table = table.table.map((estimate: Estimate) => {
        return new Estimate(estimate.user, estimate.storyPoint);
      });
      return tableObject;
    });
    console.log(pokerCacheObject);
    return pokerCacheObject
  }