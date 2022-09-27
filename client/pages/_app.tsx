import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { Provider } from "react-redux";
import store from "../redux/store";

import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/customTheme";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
