import React from 'react';
import './CollectionPreview.styles.scss';
import CollectionItem from '../CollectionItem/CollectionItem';

const CollectionPreview = ({ title, items }) => {
	return (
		<div className='collection-preview'>
			<h2 className='title'>{title.toUpperCase()}</h2>
			<div className='preview'>
				{items
					.filter((item, index) => index < 4)
					.map((item) => (
						<CollectionItem key={item.id} item={item} />
					))}
			</div>
		</div>
	);
};

export default CollectionPreview;
