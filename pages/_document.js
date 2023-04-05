// This is a Next.js special file that allows you to customize the <html> and <body> tags.
// It's not required, but it's a good place to add global styles.
// Learn more: https://nextjs.org/docs/advanced-features/custom-document
// Used here to add a global font

import Document, {HTML, Head, Main, NextScript} from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
        <HTML>
            <Head>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </HTML>
        );
    }
    }