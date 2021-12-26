// import App from "next/app";
// noinspection JSUnusedGlobalSymbols
import type { AppProps } from 'next/app';
import '../styles/globals.css';

// Uncomment if running locally without a linked domain
// axios.defaults.baseURL = 'http://localhost:3000';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
