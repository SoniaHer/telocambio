/** @format */

import React from "react";
import { Image } from "react-native";
import { ThemeProvider } from "@callstack/react-theme-provider";
import { AppLoading, Asset, Font } from "@expo";
import Reactotron from "reactotron-react-native";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { initializeAndTestStore } from "@services/initializeStore";
import store from "@store/configureStore";
import { Color } from "@common";
import RootRouter from "./src/Router";
import "./ReactotronConfig";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

const persistor = persistStore(store);

console.ignoredYellowBox = [
  "Warning: View.propTypes",
  "Require cycle:",
];

export default class App extends React.Component {
  state = {
    appIsReady: false,
    primaryColor: Color.primary,
    isNewStore: false,
  };

  componentWillMount() {
    if (__DEV__) {
      Reactotron.connect();
      Reactotron.clear();
    }
  }

  _initializeStore = () => {
    initializeAndTestStore()
      .then((store) => {
        this.setState({
          primaryColor: store.shopify.primaryColor,
          isNewStore: store.isNewStore,
          appIsReady: true,
        });
      })
      .catch((error) => {
        this.setState({ appIsReady: true });
        console.log(error);
      });
  };

  loadAssets = async () => {
    const fontAssets = cacheFonts([
      { Dosis: require("@assets/fonts/Dosis-Regular.ttf") },
      { "Dosis-Bold": require("@assets/fonts/Dosis-Bold.ttf") },
      { Baloo: require("@assets/fonts/Baloo-Regular.ttf") },
      { Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf") },
    ]);

    const imageAssets = cacheImages([
      require("@images/checkout/header_cart.png"),
    ]);

    await Promise.all([...fontAssets, ...imageAssets]);
  };

  render() {
    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={this._initializeStore}
        />
      );
    }

    if (this.state.isNewStore) {
      store.dispatch({ type: "CLEAN_OLD_STORE" });
    }

    const Theme = {
      primaryColor: this.state.primaryColor,
    };

    console.log("Theme", Theme);

    return (
      <ThemeProvider theme={Theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <RootRouter persistor={persistor} />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    );
  }
}
