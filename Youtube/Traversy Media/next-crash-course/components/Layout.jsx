import Head from 'next/head';
import styles from '../styles/Layout.module.css';
import Nav from './Nav';
import Header from './Header';

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>WebDev News</title>
				<meta name='keywords' content='web development, programming' />
			</Head>
			<Nav />
			<div className={styles.container}>
				<main className={styles.main}>
					<Header />
					{children}
				</main>
			</div>
		</>
	);
};

export default Layout;
