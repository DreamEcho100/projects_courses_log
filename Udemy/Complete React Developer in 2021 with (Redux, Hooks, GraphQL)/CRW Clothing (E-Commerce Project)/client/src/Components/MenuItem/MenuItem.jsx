import React from "react";
import { withRouter } from "react-router-dom";
import "./MenuItem.styles.scss";

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
	console.log(history);
	return (
		<div
			className={`menu-item ${size} bg-no-repeat bg-position-center bg-size-cover`}
			key={key}
			onClick={() => history.push(`${match.url}${linkUrl}`)}
		>
			<div
				className="background-image bg-no-repeat bg-position-center bg-size-cover w-100percent h-100percent"
				style={{ backgroundImage: `url(${imageUrl})` }}
			></div>
			<div className="content">
				<h2 className="title">{title.toUpperCase()}</h2>
				<span className="subtitle">{subtitle}</span>
			</div>
		</div>
	);
};

export default withRouter(MenuItem);
