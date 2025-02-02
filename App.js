import React from "react";
import { Platform, StatusBar, StyleSheet, View, YellowBox } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./navigation/AppNavigator";
import * as firebase from "firebase";
import { Provider } from "react-redux";
import store from "./redux/store"; //Import the store
import { FormattedProvider } from "react-native-globalize";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  constructor(props) {
    super(props);
    var config = {
      apiKey: "AIzaSyBvkfn625yeD-iuYvFjiz6JHNQ8t8_rsxI",
      authDomain: "crffnproject.firebaseapp.com",
      databaseURL: "https://crffnproject.firebaseio.com",
      projectId: "crffnproject",
      storageBucket: "crffnproject.appspot.com",
      messagingSenderId: "14273146734"
    };
    firebase.initializeApp(config);
  }
  componentDidMount() {
    YellowBox.ignoreWarnings(["Setting a timer"]);
  }
  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <FormattedProvider locale="en" currency="USD">
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </FormattedProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        "SFUIDisplay-Regular": require("./assets/fonts/SFUIDisplay-Regular.ttf"),
        "SFUIDisplay-Semibold": require("./assets/fonts/SF-UI-Display-Semibold.ttf"),
        "HelveticaNeue-Light": require("./assets/fonts/HelveticaNeue-Light.ttf"),
        "SFUIDisplay-Medium": require("./assets/fonts/SF-UI-Display-Medium.ttf"),
        "SFUIDisplay-Light": require("./assets/fonts/SFUIDisplay-Light.ttf"),
        Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf"),
        "SFUIDisplay-Bold": require("./assets/fonts/SFUIDisplay-Bold.ttf"),
        "Avenir-Black": require("./assets/fonts/Avenir-Black.ttf"),
        Helvetica: require("./assets/fonts/Helvetica.ttf"),
        "HelveticaNeue-Bold": require("./assets/fonts/HelveticaNeue-Bold.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
