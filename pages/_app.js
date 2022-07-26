import Root from "@components/Root";
import { store } from "@redux/store/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.css";

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Root>
          <Component {...pageProps} />
        </Root>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
