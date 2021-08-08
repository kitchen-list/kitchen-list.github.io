import kitchenListDB from '../../data/kitchenlist_db';
import FavoriteKitchenSearchView from './liked-kitchens/favorite-kitchen-search-view';
import FavoriteKitchenSearchPresenter from './liked-kitchens/favorite-kitchen-search-presenter';
import FavoriteKitchenShowPresenter from './liked-kitchens/favorite-kitchen-show-presenter';

const view = new FavoriteKitchenSearchView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },
  async afterRender() {
    new FavoriteKitchenShowPresenter({ view, favoriteKitchens: kitchenListDB });
    new FavoriteKitchenSearchPresenter({ view, favoriteKitchens: kitchenListDB });
  },
};

export default Favorite;
