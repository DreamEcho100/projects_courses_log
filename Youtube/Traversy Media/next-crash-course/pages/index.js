import ArticlesList from '../components/ArticlesList';

export default function Home({ articles }) {
	return (
		<main>
			<ArticlesList articles={articles} />
		</main>
	);
}

export const getStaticProps = async () => {
	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts?_limit=6`
		);
		const articles = await response.json();

		return {
			props: {
				articles,
			},
		};
	} catch (error) {
		console.error(error);
	}
};
