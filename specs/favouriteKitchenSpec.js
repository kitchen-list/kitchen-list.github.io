import kitchenListDB from '../src/scripts/data/kitchenlist_db';
import * as TestFactories from './helpers/testFactories';

const addLikeButtonContainer = () => {
	document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Liking A Restaurant', () => {
	beforeEach(() => {
		addLikeButtonContainer();
	});

	it('should show the like button when the kitchen has not been liked before', async () => {
		await TestFactories.createLikeButtonPresenterWithKitchen({ restaurant: {id: 1} });
		expect(document.querySelector('[aria-label="like this resto"]'))
			.toBeTruthy();
	});

	it('should not show the unlike button when the restaurant has not been liked before', async () => {
		await TestFactories.createLikeButtonPresenterWithKitchen({ restaurant: {id: 1} });

		expect(document.querySelector('[aria-label="unlike this resto"]'))
			.toBeFalsy();
	});

	it('should be able to like the restaurant', async () => {
		await TestFactories.createLikeButtonPresenterWithKitchen({ restaurant: {id: 1} });

		document.querySelector('#likeButton').dispatchEvent(new Event('click'));
		const kitchen = await kitchenListDB.getKitchen(1);

		expect(kitchen).toEqual({ id: 1 });

		kitchenListDB.deleteKitchen(1);
	});

	it('should not add a restaurant again when its already liked', async () => {
		await TestFactories.createLikeButtonPresenterWithKitchen({ restaurant: {id: 1} });

		// Tambahkan film dengan ID 1 ke daftar film yang disukai
		await kitchenListDB.putKitchen({ id: 1 });
		// Simulasikan pengguna menekan tombol suka film
		document.querySelector('#likeButton').dispatchEvent(new Event('click'));
		// tidak ada film yang ganda
		expect(await kitchenListDB.getAllKitchens()).toEqual([{ id: 1 }]);

		kitchenListDB.deleteKitchen(1);
	});

	it('should not add a restaurant when it has no id', async () => {
		await TestFactories.createLikeButtonPresenterWithKitchen({ restaurant: {} });

		document.querySelector('#likeButton').dispatchEvent(new Event('click'));

		expect(await kitchenListDB.getAllKitchens()).toEqual([]);
	});
});