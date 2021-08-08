import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import kitchenListDB from '../../src/scripts/data/kitchenlist_db';

const createLikeButtonPresenterWithKitchen = async (resto) => {
	await LikeButtonPresenter.init({
		likeButtonContainer: document.querySelector('#likeButtonContainer'),
		favoriteKitchens: kitchenListDB,
		resto,
	});
};

export { createLikeButtonPresenterWithKitchen };