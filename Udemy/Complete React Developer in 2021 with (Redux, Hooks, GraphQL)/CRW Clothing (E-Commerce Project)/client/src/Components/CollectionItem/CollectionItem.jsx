import React from 'react';
import './CollectionItem.styles.scss';
import CustomButton from '../CustomButton/CustomButton';

const CollectionItem = ({ id, name, price, imageUrl }) => {
	return (
		<div className='collection-item'>
			<div
				className='image'
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			/>
			<div className='collection-footer'>
				<span className='name'>{name}</span>
				<span className='price'>{price}</span>
			</div>
			<div style={{ width: '100%' }} className='one-button-holder'>
				<CustomButton inverted>Add To Cart</CustomButton>
			</div>
		</div>
	);
};

export default CollectionItem;
