import { DBConfig } from 'ngx-indexed-db';
import { dbName, dbStore } from './constants/db.constants';

const dbConfig: DBConfig = {
  name: dbName,
  version: 1,
  objectStoresMeta: [
    {
      store: dbStore,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'hex', keypath: 'hex', options: { unique: true } },
        { name: 'at', keypath: 'at', options: { unique: false } },
      ],
    },
  ],
};

export default dbConfig;
