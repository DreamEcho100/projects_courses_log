import Document, { Html, Head, Main, NextScript } from 'next/document';
import script1 from '../static/JS/script1';

class MyDocument extends Document {
	// static async getInitialProps(ctx) {
	// 	const initialProps = await Document.getInitialProps(ctx);
	// 	return { ...initialProps };
	// }

	render() {
		return (
			<Html lang='en'>
				<Head></Head>
				<body onLoad={() => handleMainSpecialColor()} className='theme-dark-2'>
					<Main />
					<NextScript />
					<script
						defer
						dangerouslySetInnerHTML={{
							__html: script1,
						}}
					></script>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
