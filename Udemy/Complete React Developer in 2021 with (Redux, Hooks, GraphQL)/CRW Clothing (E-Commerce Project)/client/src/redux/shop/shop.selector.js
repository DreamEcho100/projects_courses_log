import { createSelector } from 'reselect';

const shopSelector = (state) => state.shop;

export const selectCollections = createSelector(
	[shopSelector],
	(shop) => shop.collections
);

export const selectCollectionForPreview = createSelector(
	[selectCollections],
	(collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCollection = (collectionUrlParam) =>
	createSelector(
		[selectCollections],
		(collections) => collections[collectionUrlParam] // collections.find((collection) => collection.routeName === collectionUrlParam) // collection.id === COLLECTION_ID_MAP[collectionUrlParam]
	);
