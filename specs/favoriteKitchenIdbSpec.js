import { itActsAsFavoriteKitchenModel } from './contract/favoriteKitchenContract';
import kitchenListDB from '../src/scripts/data/kitchenlist_db';
 
describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await kitchenListDB.getAllKitchens()).forEach(async (kitchen) => {
      await kitchenListDB.deleteKitchen(kitchen.id);
    });
  });
 
  itActsAsFavoriteKitchenModel(kitchenListDB);
});