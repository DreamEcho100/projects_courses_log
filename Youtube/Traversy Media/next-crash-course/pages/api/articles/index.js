import { articles } from '../../../data';

const handler = (request, response) => {
	response.status(200).json(articles);
};

export default handler;
