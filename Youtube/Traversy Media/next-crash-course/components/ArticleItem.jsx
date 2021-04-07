import Link from 'next/link';
import articleStyles from '../styles/Article.module.css';

const ArticleItem = ({ article }) => {
	return (
		<Link
			href={`/article/${article.id}`}
			// href='/article/[id]'
			// as={`/article/${article.id}`}
			// as={`/article/${article.title
			// 	.replace(/\s{1,}/g, '-')
			// 	.replace(/-{2,}/g, '-')}?articleId=${article.id}`}
		>
			<a className={articleStyles.card}>
				<h3>{article.title} &rarr;</h3>
				<p>{article.body}</p>
			</a>
		</Link>
	);
};

export default ArticleItem;
