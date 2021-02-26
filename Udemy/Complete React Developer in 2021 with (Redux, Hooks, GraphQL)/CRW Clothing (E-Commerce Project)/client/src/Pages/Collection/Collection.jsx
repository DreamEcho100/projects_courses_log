import React from 'react';
import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selector';

// import CartItem from '../../Components/CartItem/CartItem';

import './Collection.css';

const Collection = (props) => {
	const { collection } = props;
	console.log(props, props.match.params.collectionId, collection);
	return (
		<section>
			<h1>Collection</h1>
		</section>
	);
};

const mapStateToProps = (state, ownProps) => ({
	collection: selectCollection(ownProps.match.params.collectionId)(state),
});

/*const mapStateToProps = (state, ownProps) => {
	console.log(ownProps.match.params.collectionId);
	return {
		collection: selectCollection(ownProps.match.params.collectionId),
	};
};*/

export default connect(mapStateToProps)(Collection);
