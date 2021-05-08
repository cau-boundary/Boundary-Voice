import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html>
				<Head></Head>
				<body>
					<Main /> {/* 라우트에 해당하는 페이지 렌더링 */}
					<NextScript /> {/* Next.js 관련 js 파일 */}
					<script src="/js/jquery.min.js"></script>
					<script src="/js/jquery.scrolly.min.js"></script>
					<script src="/js/jquery.scrollex.min.js"></script>
					<script src="/js/browser.min.js"></script>
					<script src="/js/breakpoints.min.js"></script>
					<script src="/js/util.js"></script>
					<script src="/js/main.js"></script>
				</body>
			</Html>
		);
	}
}
