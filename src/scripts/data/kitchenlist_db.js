import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const kitchenListDB = {
  async getKitchen(id) {
    if (!id) {
      return;
    }
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllKitchens() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putKitchen(kitchen) {
    if (!kitchen.hasOwnProperty('id')) {
      return;
    }
    return (await dbPromise).put(OBJECT_STORE_NAME, kitchen);
  },
  async deleteKitchen(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
  async searchKitchens(query) {
    return (await this.getAllKitchens()).filter((kitchen) => {
      const loweredCaseKitchenTitle = (kitchen.name || '-').toLowerCase();
      const jammedKitchenTitle = loweredCaseKitchenTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedKitchenTitle.indexOf(jammedQuery) !== -1;
    });
  },
};

export default kitchenListDB;
