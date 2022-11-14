import Root from "@components/Root";
import { CommonContextProvider } from "@context/commonContext";
import { store } from "@redux/store/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const persistor = persistStore(store);

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon],
  [
    alchemyProvider({
      apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_ALCHEMY_ID}`,
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Maker Academy",
  chains,
});

const wagmiClient = createClient({
  connectors,
  provider,
});

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
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
              <CommonContextProvider>
                <Root>
                  <Component {...pageProps} />
                </Root>
              </CommonContextProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
