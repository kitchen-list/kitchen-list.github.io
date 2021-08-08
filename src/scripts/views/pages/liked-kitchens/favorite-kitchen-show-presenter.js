class FavoriteKitchenShowPresenter {
  constructor({ view, favoriteKitchens }) {
    this._view = view;
    this._favoriteKitchens = favoriteKitchens;

    this._showFavoriteKitchens();
  }

  async _showFavoriteKitchens() {
    const kitchens = await this._favoriteKitchens.getAllKitchens();
    this._displayKitchens(kitchens);
  }

  _displayKitchens(kitchens) {
    this._view.showFavoriteKitchens(kitchens);
  }
}

export default FavoriteKitchenShowPresenter;
