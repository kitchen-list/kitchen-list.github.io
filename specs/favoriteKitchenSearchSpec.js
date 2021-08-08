import FavoriteKitchenSearchPresenter from '../src/scripts/views/pages/liked-kitchens/favorite-kitchen-search-presenter';
import kitchenListDB from '../src/scripts/data/kitchenlist_db';
import FavoriteKitchenSearchView from '../src/scripts/views/pages/liked-kitchens/favorite-kitchen-search-view';

describe('Searching restaurants', () => {
	let presenter;
	let favoriteKitchens;
	let view;

	const searchKitchens = (query) => {
		const queryElement = document.getElementById('query');
		queryElement.value = query;
		queryElement.dispatchEvent(new Event('change'));
	};

	const setKitchenSearchContainer = () => {
		view = new FavoriteKitchenSearchView();
		document.body.innerHTML = view.getTemplate();
	};

	const constructPresenter = () => {
		favoriteKitchens = spyOnAllFunctions(kitchenListDB);
		presenter = new FavoriteKitchenSearchPresenter({
			favoriteKitchens,
			view
		});
	};

	beforeEach(() => {
		setKitchenSearchContainer();
		constructPresenter();
	});

	describe('When query is not empty', () => {

		it('should be able to capture the query typed by the user', () => {
			searchKitchens('kitchen a');

			expect(presenter.latestQuery).toEqual('kitchen a');
		});

		it('should ask the model to search for liked restaurants', () => {
			searchKitchens('kitchen a');

			expect(favoriteKitchens.searchKitchens)
			    .toHaveBeenCalledWith('kitchen a');
		});

		it('should show - when the restaurant returned does not contain a title', (done) => {
			document.getElementById('restos').addEventListener('restos:updated', () => {
				const kitchenTitles = document.querySelectorAll('.resto__title');
				expect(kitchenTitles.item(0).textContent).toEqual('-');
				done();
			});

			favoriteKitchens.searchKitchens.withArgs('kitchen a').and.returnValues([
				{ id: 444 },
			]);

			searchKitchens('kitchen a');
		});

		it('should show the restaurants found by Favorite Kitchens', (done) => {
			document.getElementById('restos').addEventListener('restos:updated', () => {
					expect(document.querySelectorAll('.resto-item').length).toEqual(3);
					done();
				});

			favoriteKitchens.searchKitchens.withArgs('kitchen a').and.returnValues([
				{ id: 111, title: 'kitchen abc' },
				{ id: 222, title: 'ada juga kitchen abcde' },
				{ id: 333, title: 'ini juga boleh kitchen a' },
			]);

			searchKitchens('kitchen a');
		});

		it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
			document.getElementById('restos').addEventListener('restos:updated', () => {
				const kitchenTitles = document.querySelectorAll('.resto__title');
				expect(kitchenTitles.item(0).textContent).toEqual('kitchen abc');
				expect(kitchenTitles.item(1).textContent).toEqual('ada juga kitchen abcde');
				expect(kitchenTitles.item(2).textContent).toEqual('ini juga boleh kitchen a');

				done();
			});

			favoriteKitchens.searchKitchens.withArgs('kitchen a').and.returnValues([
				{ id: 111, name: 'kitchen abc' },
				{ id: 222, name: 'ada juga kitchen abcde' },
				{ id: 333, name: 'ini juga boleh kitchen a' },
			]);

			searchKitchens('kitchen a');
		});
	});

	describe('When query is empty', () => {
		it('should capture the query as empty', () => {
			searchKitchens(' ');
			expect(presenter.latestQuery.length).toEqual(0);

			searchKitchens('    ');
			expect(presenter.latestQuery.length).toEqual(0);

			searchKitchens('');
			expect(presenter.latestQuery.length).toEqual(0);

			searchKitchens('\t');
			expect(presenter.latestQuery.length).toEqual(0);
		});

		it('should show all favorite restaurants', () => {
			searchKitchens('');

			expect(favoriteKitchens.getAllKitchens)
				.toHaveBeenCalled();
		});
	});

	describe('When no favorite restaurants could be found', () => {
		it('should show the empty message', (done) => {
			document.getElementById('restos').addEventListener('restos:updated', () => {
					expect(document.querySelectorAll('.resto-item__not__found').length)
						.toEqual(1);
					done();
				});

			favoriteKitchens.searchKitchens.withArgs('kitchen a').and.returnValues([]);

			searchKitchens('kitchen a');
		});

		it('should not show any restaurant', (done) => {
			document.getElementById('restos').addEventListener('restos:updated', () => {
				expect(document.querySelectorAll('.resto-item').length).toEqual(0);
				done();
			});

			favoriteKitchens.searchKitchens.withArgs('kitchen a').and.returnValues([]);

			searchKitchens('kitchen a');
		});
	});
});