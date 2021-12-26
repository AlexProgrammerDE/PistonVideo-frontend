// import App from "next/app";
// noinspection JSUnusedGlobalSymbols
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000';

import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
