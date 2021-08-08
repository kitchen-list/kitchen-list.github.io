import { createListItemTemplate } from '../../templates/template-creator';

class FavoriteKitchenSearchView {
  getTemplate() {
    return '<div class="content"><input id="query" type="text"><h2 class="content__heading">Your Liked resto</h2><div id="restos" class="restos"></div></div>';
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteKitchens(kitchens = []) {
    let html;
    if (kitchens.length) {
      html = kitchens.reduce(
        (carry, kitchen) => carry.concat(createListItemTemplate(kitchen)), '',
      );
    } else {
      html = this._getEmptyKitchenTemplate();
    }
    document.getElementById('restos').innerHTML = html;

    document.getElementById('restos').dispatchEvent(new Event('restos:updated'));
  }

  _getEmptyKitchenTemplate() {
    return '<div class="resto-item__not__found">Tidak ada resto untuk ditampilkan</div>';
  }
}

export default FavoriteKitchenSearchView;
