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
			className={`menu-item ${size} bg-img-fixies-1`}
			key={key}
			onClick={() => history.push(`${match.url}${linkUrl}`)}
		>
			<div
				className="background-image bg-img-fixies-1 full-w-h-container"
				style={{ backgroundImage: `url(${imageUrl})` }}
			></div>
			<div className="content">
				<h1 className="title">{title.toUpperCase()}</h1>
				<span className="subtitle">{subtitle}</span>
			</div>
		</div>
	);
};

export default withRouter(MenuItem);
