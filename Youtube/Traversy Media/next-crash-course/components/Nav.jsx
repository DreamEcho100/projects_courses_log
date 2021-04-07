import Link from 'next/link';
import styles from '../styles/Nav.module.css';

const Nav = () => {
	const nextThemeHandler = () => {
		body.classList.remove(currentThemes[currentThemeIndex].theme);

		if (currentThemeIndex + 1 >= currentThemes.length) {
			currentThemeIndex = 0;
		} else {
			currentThemeIndex++;
		}

		setMainThemeAndMainSpecialColor();
	};
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<Link href='/'>Home</Link>
				</li>
				<li>
					<Link href='/about'>About</Link>
				</li>
				<li>
					<button
						className={styles.changeThemeHandler}
						onClick={() => nextThemeHandler()}
					>
						Change Theme
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
