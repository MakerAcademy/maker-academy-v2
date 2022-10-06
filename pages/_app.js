import Root from "@components/Root";
import { CommonContextProvider } from "@context/commonContext";
import { store } from "@redux/store/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress
        color="#1AAB9B"
        startPosition={0.3}
        stopDelayMs={200}
        height={6}
        showOnShallow={true}
      />

      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <CommonContextProvider>
            <Root>
              <Component {...pageProps} />
            </Root>
          </CommonContextProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
