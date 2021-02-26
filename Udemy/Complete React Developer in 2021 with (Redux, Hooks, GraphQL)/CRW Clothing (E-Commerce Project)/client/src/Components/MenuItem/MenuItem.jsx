import React from 'react';
import { withRouter } from 'react-router-dom';
import './MenuItem.css';

const MenuItem = ({
	key,
	title,
	subtitle,
	imageUrl,
	linkUrl,
	size,
	history,
	match,
}) => {
	return (
		<div
			className={`menu-item ${size} bg-no-repeat bg-position-center bg-size-cover`}
			key={key}
			onClick={() => {
				// console.log(`/shop/${title}`);
				history.push(`/shop/${title.toLowerCase()}`);
				// history.push(`${match.url}${linkUrl}}`);
				/*setTimeout(
					() =>
						document
							.getElementById(title)
							.scrollIntoView({ behavior: 'smooth' }),
					0
				);*/ // document.getElementById(title).scrollIntoView();
			}}
		>
			<div
				className='background-image bg-no-repeat bg-position-center bg-size-cover w-100percent h-100percent'
				style={{ backgroundImage: `url(${imageUrl})` }}
			></div>
			<div className='content'>
				<h2 className='title'>{title.toUpperCase()}</h2>
				<span className='subtitle'>{subtitle}</span>
			</div>
		</div>
	);
};

export default withRouter(MenuItem);
