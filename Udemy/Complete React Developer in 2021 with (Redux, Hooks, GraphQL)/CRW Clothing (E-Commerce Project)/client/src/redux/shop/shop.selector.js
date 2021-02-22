import { createSelector } from 'reselect';

const shopSelector = (state) => state.shop;

export const selectCollections = createSelector(
	[shopSelector],
	(shop) => shop.collections
);
