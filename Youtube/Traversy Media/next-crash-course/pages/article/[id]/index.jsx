import { useRouter } from 'next/router';
import Link from 'next/link';
import Meta from '../../../components/Meta';

const article = ({ article }) => {
	// const router = useRouter();
	// const { id } = router.query;

	return (
		<>
			<Meta title={article.title} description={article.excerpt} />
			<h1>{article.title}</h1>
			<p>{article.body}</p>
			<br />
			<Link href='/'>Go Back</Link>
		</>
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

export const getStaticProps = async (context) => {
	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${context.params.id}`
		);

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
		const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

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
