const dev = process.env.NODE_ENV !== 'production';

export const server = true
	? 'http://localhost:3000'
	: 'https://yourwebsite.com';
