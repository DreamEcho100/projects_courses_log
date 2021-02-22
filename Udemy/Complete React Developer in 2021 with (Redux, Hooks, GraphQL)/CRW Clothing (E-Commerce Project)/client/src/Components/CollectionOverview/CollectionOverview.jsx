import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../../Components/CollectionPreview/CollectionPreview';

import { selectCollections } from '../../redux/shop/shop.selector';

import './CollectionOverview.scss';

const CollectionOverview = ({ collections }) => {
	return (
		<>
			{collections.map(({ id, ...otherItems }) => (
				<CollectionPreview key={id} {...otherItems} />
			))}
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	collections: selectCollections,
});

export default connect(mapStateToProps)(CollectionOverview);
