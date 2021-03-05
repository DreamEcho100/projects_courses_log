const router = require('express').Router();
const Post = require('../../models/Post/Post');

router.get('/', async (request, response) => {
	try {
		const posts = await Post.find();
		response.send(posts);
	} catch (error) {
		response.status(404).json({ message: error });
	}
});

router.get('/:id', async (request, response) => {
	try {
		const { id } = request.params;
		const post = await Post.findById(id);
		response.json(post);
	} catch (error) {
		response.status(404).json({ message: error });
	}
});

router.post('/', async (request, response) => {
	try {
		const { title, description } = request.body;
		const post = new Post({
			title,
			description,
		});

		const savedPost = await post.save();
		response.json(savedPost);
	} catch (error) {
		response.status(404).json({ message: error });
	}
});

router.put('/:id', async (request, response) => {
	try {
		const { id } = request.params;
		const { title, description } = request.body;
		const updatedPost = await Post.updateOne(
			{ _id: id },
			{ $set: { title, description } }
		);
		response.json(updatedPost);
	} catch (error) {
		response.status(404).json({ message: error });
	}
});

router.delete('/:id', async (request, response) => {
	try {
		const { id } = request.params;
		const removedPost = await Post.remove({ _id: id });
		response.json(removedPost);
	} catch (error) {
		response.status(404).json({ message: error });
	}
});

module.exports = router;
