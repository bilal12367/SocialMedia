import { Provider } from "react-redux";
import store from "../store";

//Bootstrap Imports
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";



import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
