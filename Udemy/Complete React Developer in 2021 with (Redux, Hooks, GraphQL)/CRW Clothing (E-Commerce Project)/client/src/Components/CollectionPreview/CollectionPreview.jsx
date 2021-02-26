import React from 'react';

import CollectionItem from '../CollectionItem/CollectionItem';

import './CollectionPreview.css';

const CollectionPreview = ({ title, items }) => {
	return (
		<div className='collection-preview'>
			<h2 id={title.toLowerCase()} className='title'>
				{title.toUpperCase()}
			</h2>
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
