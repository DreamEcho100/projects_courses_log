import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollection } from '../../redux/shop/shop.selector';

// import CartItem from '../../Components/CartItem/CartItem';
import CollectionItem from '../../Components/CollectionItem/CollectionItem';

import './Collection.css';

const Collection = ({ collection }) => {
	const { title, items } = collection;

	return (
		<section className='collection-page'>
			<h2 className='title'>{title}</h2>
			<div className='items'>
				{items.map((item) => (
					<CollectionItem key={item.id} item={item} />
				))}
			</div>
		</section>
	);
};

const mapStateToProps = (state, ownProps) => ({
	collection: selectCollection(ownProps.match.params.collectionId)(state), // selectCollection(ownProps.match.params.collectionId)(state),
});
/*const mapStateToProps = (state, ownProps) => ({
	collection: selectCollection(ownProps.match.params.collectionId)(state),
});*/

/*const mapStateToProps = (state, ownProps) => {
	console.log(ownProps.match.params.collectionId);
	return {
		collection: selectCollection(ownProps.match.params.collectionId),
	};
};*/

export default connect(mapStateToProps)(Collection);
