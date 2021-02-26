import React from 'react';
import './Home.css';
import DirectoryMenu from '../../Components/DirectoryMenu/DirectoryMenu.jsx';

const Home = (props) => {
	return (
		<section className='home'>
			<DirectoryMenu history={props.history} />
		</section>
	);
};

export default Home;
