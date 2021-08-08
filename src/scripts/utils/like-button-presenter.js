import { createLikeKitchenButtonTemplate, createUnlikeKitchenButtonTemplate } from '../views/templates/template-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, favoriteKitchens, resto }) {
    this._likeButtonContainer = likeButtonContainer;
    this._resto = resto.restaurant;
    this._favoriteKitchens = favoriteKitchens;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._resto;

    if (await this._isKitchenExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isKitchenExist(id) {
    const kitchen = await this._favoriteKitchens.getKitchen(id);
    return !!kitchen;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeKitchenButtonTemplate();
    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteKitchens.putKitchen(this._resto);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeKitchenButtonTemplate();
    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteKitchens.deleteKitchen(this._resto.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
