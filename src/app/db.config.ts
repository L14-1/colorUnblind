import { DBConfig } from 'ngx-indexed-db';
import {
  DB_DESCRIPTION_STORE,
  DB_FAVORITES_STORE,
  DB_NAME,
  DB_STORE,
} from './constants/db.constants';

const DB_CONFIG: DBConfig = {
  name: DB_NAME,
  version: 3,
  objectStoresMeta: [
    {
      store: DB_STORE,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'hex', keypath: 'hex', options: { unique: true } },
        { name: 'at', keypath: 'at', options: { unique: false } },
      ],
    },
    {
      store: DB_DESCRIPTION_STORE,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'hex', keypath: 'hex', options: { unique: true } },
        {
          name: 'description',
          keypath: 'description',
          options: { unique: false },
        },
      ],
    },
    {
      store: DB_FAVORITES_STORE,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [{ name: 'hex', keypath: 'hex', options: { unique: true } }],
    },
  ],
};

export default DB_CONFIG;
