import React from 'react';
import { Route } from 'react-router-dom';

import CollectionOverview from '../../Components/CollectionOverview/CollectionOverview';
import Collection from '../Collection/Collection';

const Shop = ({ match }) => {
	return (
		<section className='shop-page'>
			<Route exact path={`${match.path}`} component={CollectionOverview} />
			<Route
				exact
				path={`${match.path}/:collectionId`}
				component={Collection}
			/>
		</section>
	);
};

export default Shop;
