import { itActsAsFavoriteKitchenModel } from './contract/favoriteKitchenContract';
 
let favoriteKitchens = [];
 
const FavoriteKitchenArray = {
  getKitchen(id) {
    if (!id) {
      return;
    }
 
    return favoriteKitchens.find((kitchen) => kitchen.id == id);
  },
 
  getAllKitchens() {
    return favoriteKitchens;
  },
 
  putKitchen(kitchen) {
    if (!kitchen.hasOwnProperty('id')) {
      return;
    }
 
    // pastikan id ini belum ada dalam daftar favoriteKitchens
    if (this.getKitchen(kitchen.id)) {
      return;
    }
 
    favoriteKitchens.push(kitchen);
  },
 
  deleteKitchen(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteKitchens = favoriteKitchens.filter((kitchen) => kitchen.id != id);
  },

  searchKitchens(query) {
    return this.getAllKitchens()
      .filter((kitchen) => {
        const loweredCaseKitchenTitle = (kitchen.name || '-').toLowerCase();
        const jammedKitchenTitle = loweredCaseKitchenTitle.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedKitchenTitle.indexOf(jammedQuery) !== -1;
      });
  },
};
 
describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => favoriteKitchens = []);
 
  itActsAsFavoriteKitchenModel(FavoriteKitchenArray);
});