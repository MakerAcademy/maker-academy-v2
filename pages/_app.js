import Root from "@components/Root";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "@redux/store/store";
import appWithI18n from "next-translate/appWithI18n";
import i18nConfig from "@i18n";

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

export default appWithI18n(MyApp, { ...i18nConfig });
