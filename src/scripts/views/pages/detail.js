import UrlParser from '../../routes/url-parser';
import Source from '../../data/source';
import {
  createListDetailTemplate,
  createListTemplate,
  createReviewTemplate,
} from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import kitchenListDB from '../../data/kitchenlist_db';

const Detail = {
  async render() {
    return `
      <div id="resto" class="resto"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resto = await Source.detail(url.id);
    const restoContainer = document.querySelector('#resto');
    const foods = this._createMenuList(resto.restaurant.menus.foods);
    const drinks = this._createMenuList(resto.restaurant.menus.drinks);
    const reviews = this._createListReview(resto.restaurant.customerReviews);
    const list = resto.restaurant;
    restoContainer.innerHTML = createListDetailTemplate({
      list, foods, drinks, reviews,
    });
    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteKitchens: kitchenListDB,
      resto: {
        restaurant: {
          id: list.id,
          name: list.name,
          pictureId: list.pictureId,
          address: list.address,
          city: list.city,
          rating: list.rating,
          description: list.description,
          menus: resto.restaurant.menus,
        },
      },
    });
  },

  _createMenuList(datas) {
    let html = '';
    datas.forEach((data) => {
      html += createListTemplate(data.name);
    });
    return html;
  },

  _createListReview(datas) {
    let html = '';
    datas.forEach((data) => {
      html += createReviewTemplate(data);
    });
    return html;
  },
};

export default Detail;
