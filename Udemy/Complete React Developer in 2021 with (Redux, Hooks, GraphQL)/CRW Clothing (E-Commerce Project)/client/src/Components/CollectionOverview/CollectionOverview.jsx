import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../../Components/CollectionPreview/CollectionPreview';

import { selectCollectionForPreview } from '../../redux/shop/shop.selector';

import './CollectionOverview.css';

const CollectionOverview = ({ collections }) => {
	console.log(collections);
	return (
		<>
			{collections.map(({ id, ...otherItems }) => (
				<CollectionPreview key={id} {...otherItems} />
			))}
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	collections: selectCollectionForPreview,
});

export default connect(mapStateToProps)(CollectionOverview);
