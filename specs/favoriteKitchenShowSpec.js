import FavoriteKitchenSearchView from '../src/scripts/views/pages/liked-kitchens/favorite-kitchen-search-view';
import kitchenListDB from '../src/scripts/data/kitchenlist_db';
import FavoriteKitchenShowPresenter from '../src/scripts/views/pages/liked-kitchens/favorite-kitchen-show-presenter';

describe('Showing all favorite restaurants', () => {
	let view;

	const renderTemplate = () => {
		view = new FavoriteKitchenSearchView();
		document.body.innerHTML = view.getTemplate();
	};

	beforeEach(() => {
		renderTemplate();
	});

	describe('When no restaurants have been liked', () => {

		it('should ask for the favorite restaurants', () => {
			const favoriteKitchens = spyOnAllFunctions(kitchenListDB);
			new FavoriteKitchenShowPresenter({
				view,
				favoriteKitchens,
			});

			expect(favoriteKitchens.getAllKitchens).toHaveBeenCalledTimes(1);
		});

		it('should show the information that no restaurants have been liked', (done) => {
			document.getElementById('restos').addEventListener('restos:updated', () => {
				expect(document.querySelectorAll('.resto-item__not__found').length)
					.toEqual(1);

				done();
			});

			const favoriteKitchens = spyOnAllFunctions(kitchenListDB);
			favoriteKitchens.getAllKitchens.and.returnValues([]);

			new FavoriteKitchenShowPresenter({
				view,
				favoriteKitchens,
			});
		});
	});

	describe('When favorite restaurants exist', () => {
		it('should show the restos', (done) => {
			document.getElementById('restos').addEventListener('restos:updated', () => {
			expect(document.querySelectorAll('.resto-item').length).toEqual(2);
				done();
			});

			const favoriteKitchens = spyOnAllFunctions(kitchenListDB);
			favoriteKitchens.getAllKitchens.and.returnValues([
				{
					id: 11, title: 'A', vote_average: 3, overview: 'Sebuah film A',
				},
				{
					id: 22, title: 'B', vote_average: 4, overview: 'Sebuah film B',
				},
			]);

			new FavoriteKitchenShowPresenter({
				view,
				favoriteKitchens,
			});
		});
	});
});