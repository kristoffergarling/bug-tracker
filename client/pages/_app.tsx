import type { AppProps } from "next/app";
import Head from "next/head";

import { Provider } from "react-redux";
import store from "../redux/store";

import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/customTheme";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
