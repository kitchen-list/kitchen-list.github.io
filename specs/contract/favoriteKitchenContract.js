const itActsAsFavoriteKitchenModel = (favoriteKitchen) => {
  it('should return the restaurant that has been added', async () => {
    favoriteKitchen.putKitchen({ id: 1 });
    favoriteKitchen.putKitchen({ id: 2 });
 
    expect(await favoriteKitchen.getKitchen(1))
      .toEqual({ id: 1 });
    expect(await favoriteKitchen.getKitchen(2))
      .toEqual({ id: 2 });
    expect(await favoriteKitchen.getKitchen(3))
      .toEqual(undefined);
  });
 
  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    favoriteKitchen.putKitchen({ aProperty: 'property' });
 
    expect(await favoriteKitchen.getAllKitchens())
      .toEqual([]);
  });
 
  it('can return all of the restaurants that have been added', async () => {
    favoriteKitchen.putKitchen({ id: 1 });
    favoriteKitchen.putKitchen({ id: 2 });
 
    expect(await favoriteKitchen.getAllKitchens())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });
 
  it('should remove favorite restaurant', async () => {
    favoriteKitchen.putKitchen({ id: 1 });
    favoriteKitchen.putKitchen({ id: 2 });
    favoriteKitchen.putKitchen({ id: 3 });
 
    await favoriteKitchen.deleteKitchen(1);
 
    expect(await favoriteKitchen.getAllKitchens())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });
 
  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    favoriteKitchen.putKitchen({ id: 1 });
    favoriteKitchen.putKitchen({ id: 2 });
    favoriteKitchen.putKitchen({ id: 3 });
 
    await favoriteKitchen.deleteKitchen(4);
 
    expect(await favoriteKitchen.getAllKitchens())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should be able to search for restaurants', async () => {
    favoriteKitchen.putKitchen({ id: 1, name: 'resto a' });
    favoriteKitchen.putKitchen({ id: 2, name: 'resto b' });
    favoriteKitchen.putKitchen({ id: 3, name: 'resto abc' });
    favoriteKitchen.putKitchen({ id: 4, name: 'ini mah resto abcd' });

    expect(await favoriteKitchen.searchKitchens('resto a')).toEqual([
      { id: 1, name: 'resto a' },
      { id: 3, name: 'resto abc' },
      { id: 4, name: 'ini mah resto abcd' },
    ]);
  });
};
 
export { itActsAsFavoriteKitchenModel };