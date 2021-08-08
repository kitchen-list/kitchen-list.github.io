const assert = require('assert');

Feature('Liking Kitchens');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});
 
Scenario('showing empty liked restaurant', ({ I }) => {
	I.seeElement('#query')
	I.seeElement('.resto-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
	I.seeElement('.resto-item__not__found');

	I.amOnPage('/');
	
	I.seeElement('.resto__title a');

	const firstResto = locate('.resto__title a').first();
	const firstRestoTitle = await I.grabTextFrom(firstResto);
	I.click(firstResto);

	I.seeElement('#likeButton');
	I.click('#likeButton');

	I.amOnPage('/#/favorite');
	I.seeElement('.resto-item');
	const likedRestoTitle = await I.grabTextFrom('.resto__title');

	assert.strictEqual(firstRestoTitle, likedRestoTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
	I.seeElement('.resto-item__not__found');

	I.amOnPage('/');
	
	I.seeElement('.resto__title a');

	const firstResto = locate('.resto__title a').first();
	const firstRestoTitle = await I.grabTextFrom(firstResto);
	I.click(firstResto);

	I.seeElement('#likeButton');
	I.click('#likeButton');

	I.amOnPage('/#/favorite');
	I.seeElement('.resto__title a');
	I.click(firstResto);

	I.seeElement('#likeButton');
	I.click('#likeButton');

	I.amOnPage('/#/favorite');
	I.seeElement('.resto-item__not__found');
});

Scenario('searching restaurant', async ({ I }) => {
  I.seeElement('.resto-item__not__found');

  I.amOnPage('/');

  I.seeElement('.resto__title a');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.resto__title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.resto__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchingKitchens = titles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedKitchens = await I.grabNumberOfVisibleElements('.resto-item');
  assert.strictEqual(matchingKitchens.length, visibleLikedKitchens);

  matchingKitchens.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.resto__title').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});