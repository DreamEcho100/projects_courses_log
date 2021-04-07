import articlesStyles from '../styles/Article.module.css';
import ArticleItem from './ArticleItem';

const ArticlesList = ({ articles }) => {
	return (
		<div className={articlesStyles.grid}>
			{articles.map((article) => (
				<ArticleItem key={article.id} article={article} />
			))}
		</div>
	);
};

export default ArticlesList;
