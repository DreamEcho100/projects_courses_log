import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selector';

import MenuItem from '../MenuItem/MenuItem.jsx';
//import Data from "./Data.js";

import './DirectoryMenu.styles.scss';

const DirectoryMenu = ({ sections }) => {
	return (
		<section className='directory-menu'>
			{sections.map(({ id, ...otherSectionProps }) => (
				<MenuItem key={id} {...otherSectionProps} />
			))}
		</section>
	);
};

const mapStateTopProps = createStructuredSelector({
	sections: selectDirectorySections,
});

export default connect(mapStateTopProps)(DirectoryMenu);
