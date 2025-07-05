import Dexie, { type EntityTable } from 'dexie';
import { IProfile } from './types/profile';

const db = new Dexie('ProfileDatabase') as Dexie & {
  profile: EntityTable<
    IProfile,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  profile: '++id, bg_image_url, profile_image_url, name, title, decsription, portofolio' // primary key "id" (for the runtime!)
});

export { db };