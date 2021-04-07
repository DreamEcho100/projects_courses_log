// import { useRouter } from 'next/router';
import Link from 'next/link';

import Meta from '../../../components/Meta';
import { server } from '../../../config';

const article = ({ article }) => {
	// const router = useRouter();
	// const { id } = router.query;

	return (
		<article
			style={{
				width: '90%',
				border: '0.1rem solid var(--main-special-color-1)',
				padding: '1em',
				borderRadius: '1rem',
			}}
		>
			<Meta title={article.title} description={article.excerpt} />
			<h1 style={{ color: 'var(--main-special-color-1)' }}>{article.title}</h1>
			<p>{article.body}</p>
			<br />
			<Link href='/'>
				<span
					style={{ color: 'var(--main-special-color-1)', cursor: 'pointer' }}
				>
					Go Back
				</span>
			</Link>
		</article>
	);
};

// export const getServerSideProps = async (context) => {
// 	try {
// 		const response = await fetch(
// 			`https://jsonplaceholder.typicode.com/posts/${context.params.id}`
// 		);

// 		const article = await response.json();

// 		return {
// 			props: {
// 				article,
// 			},
// 		};
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// export const getStaticProps = async (context) => {
// 	try {
// 		const response = await fetch(
// 			`https://jsonplaceholder.typicode.com/posts/${context.params.id}`
// 		);

// 		const article = await response.json();

// 		return {
// 			props: {
// 				article,
// 			},
// 		};
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// export const getStaticPaths = async () => {
// 	try {
// 		const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

// 		const articles = await response.json();

// 		const ids = articles.map((article) => article.id);
// 		const paths = ids.map((id) => ({ params: { id: id.toString() } }));

// 		return {
// 			paths,
// 			fallback: false,
// 		};
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

export const getStaticProps = async (context) => {
	try {
		const response = await fetch(`${server}/api/articles/${context.params.id}`);

		const article = await response.json();

		return {
			props: {
				article,
			},
		};
	} catch (error) {
		console.error(error);
	}
};

export const getStaticPaths = async () => {
	try {
		const response = await fetch(`${server}/api/articles`);

		const articles = await response.json();

		const ids = articles.map((article) => article.id);
		const paths = ids.map((id) => ({ params: { id: id.toString() } }));

		return {
			paths,
			fallback: false,
		};
	} catch (error) {
		console.error(error);
	}
};

export default article;
