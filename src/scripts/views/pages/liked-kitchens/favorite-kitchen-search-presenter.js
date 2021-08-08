class FavoriteKitchenSearchPresenter {
  constructor({ favoriteKitchens, view }) {
    this._view = view;
    this._listenToSearchRequestByUser();
    this._favoriteKitchens = favoriteKitchens;
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchKitchens(latestQuery);
    });
  }

  async _searchKitchens(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundKitchens;
    if (this.latestQuery.length > 0) {
      foundKitchens = await this._favoriteKitchens.searchKitchens(this.latestQuery);
    } else {
      foundKitchens = await this._favoriteKitchens.getAllKitchens();
    }
    console.log(foundKitchens);
    this._showFoundKitchens(foundKitchens);
  }

  _showFoundKitchens(kitchens = []) {
    this._view.showFavoriteKitchens(kitchens);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteKitchenSearchPresenter;
