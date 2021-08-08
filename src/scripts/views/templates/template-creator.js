import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import CONFIG from '../../globals/config';

const createListDetailTemplate = (data) => `
  <h2 class="resto__title">${data.list.name}</h2>
  <img class="resto__poster lazyload" data-src="${CONFIG.BASE_IMAGE_URL + data.list.pictureId}" alt="${data.list.name}" />
  <div class="resto__info">
  <h3>Information</h3>
    <h4>Address</h4>
    <p>${data.list.address}, ${data.list.city}</p>
    <h4>Rating</h4>
    <p>${data.list.rating}</p>
  </div>
  <div class="resto__overview">
    <h3>Description</h3>
    <p>${data.list.description}</p>
  </div>
  <div class="resto__overview">
    <h3>Menus</h3>
    <div class="menus">
      <div>
        <h4>Foods</h4>
        <ul>${data.foods}</ul>
      </div>
      <div>
        <h4>Drinks</h4>
        <ul>${data.drinks}</ul>
      </div>
    </div>
  </div>
  <div class="resto__overview">
    <h3>Customer Rewiews</h3>
    <ul class="customerReviews">${data.reviews}</ul>
  </div>
`;
const createListTemplate = (list) => `<li>${list}</li>`;
const createReviewTemplate = (data) => `
  <li>
    <h5>${data.name} <small>(${data.date})</small></h5><hr>
    <p>${data.review}</p>
  </li>
`;

const createListItemTemplate = (list) => `
  <div class="resto-item">
    <div class="resto-item__header">
        <img class="lazyload resto-item__header__poster" alt="${list.name}"
            data-src="${CONFIG.BASE_IMAGE_URL + list.pictureId}" alt="${list.names}">
        <div class="resto-item__header__rating">
            <p>⭐️<span class="resto-item__header__rating__score">${list.rating}</span></p>
        </div>
    </div>
    <div class="resto-item__content">
        <h3 class="resto__title"><a href="${`/#/detail/${list.id}`}">${list.name || '-'}</a></h3>
        <p>${list.description || '-'}</p>
    </div>
  </div>
`;
const createLikeKitchenButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeKitchenButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createListDetailTemplate,
  createListItemTemplate,
  createListTemplate,
  createReviewTemplate,
  createLikeKitchenButtonTemplate,
  createUnlikeKitchenButtonTemplate,
};
