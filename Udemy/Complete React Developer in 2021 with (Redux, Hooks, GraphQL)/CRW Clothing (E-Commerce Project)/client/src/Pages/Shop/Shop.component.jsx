import React, { Component } from "react";
import SHOP_DATA from "./SHOP_DATA";
import PreviewCollection from "../../Components/PreviewCollection/CollectionPreview";

class Shop extends Component {
	constructor(props) {
		super(props);

		this.state = {
			collection: SHOP_DATA,
		};
	}

	render() {
		const { collection } = this.state;
		return (
			<section>
				<h1>SHOP PAGE</h1>
				{collection.map(({ id, ...otherItems }) => (
					<PreviewCollection key={id} {...otherItems} />
				))}
			</section>
		);
	}
}

export default Shop;
