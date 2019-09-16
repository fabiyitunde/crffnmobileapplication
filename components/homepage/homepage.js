import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ListView,
  View,
  TextInput,
  BackHandler
} from "react-native";
import {
  Container,
  Button,
  Right,
  Left,
  ListItem,
  Content,
  Body,
  Header,
  Title,
  Footer,
  FooterTab,
  Icon
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Fonts, Metrics, Colors } from "../../Themes/";
// Screen Styles
import styles from "./styles";
import Images from "../../Themes/Images";
import Home from "../home/home";
import QRCodeScanner from "../qrcodescanner/qrcodescanner";
/**
 *  Profile Screen
 */
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "Home"
    };
  }

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Drawer");
      return true;
    });
  }

  renderSelectedTab() {
    switch (this.state.selectedTab) {
      case "Home":
        return <Home {...this.props} />;
        break;
      case "ScanCode":
        return <QRCodeScanner {...this.props} />;
        break;
      case "Invoices":
        return <Home {...this.props} />;
        break;
      case "Payments":
        return <Home {...this.props} />;
        break;
      case "Profile":
        return <Home {...this.props} />;
        break;
      default:
    }
  }

  render() {
    StatusBar.setBarStyle("dark-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#FFFFFF", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container style={styles.main}>
        <Content>{this.renderSelectedTab()}</Content>
        <Footer>
          <FooterTab style={styles.footerTabBg}>
            <Button
              vertical
              onPress={() => this.setState({ selectedTab: "Home" })}
            >
              {this.state.selectedTab == "Home" ? (
                <Image source={Images.activeHome} style={styles.tabIcon} />
              ) : (
                <Image source={Images.normalHome} style={styles.tabIcon} />
              )}
              <Text
                style={
                  this.state.selectedTab == "Home"
                    ? [
                        styles.activeTabText,
                        { marginTop: Metrics.WIDTH * 0.01 }
                      ]
                    : [
                        styles.normalTabText,
                        { marginTop: Metrics.WIDTH * 0.01 }
                      ]
                }
              >
                Home
              </Text>
            </Button>
            <Button
              vertical
              onPress={() => this.setState({ selectedTab: "ScanCode" })}
            >
              {this.state.selectedTab == "ScanCode" ? (
                <Image source={Images.activeCategory} style={styles.tabIcon} />
              ) : (
                <Image source={Images.normalCategory} style={styles.tabIcon} />
              )}
              <Text
                style={
                  this.state.selectedTab == "ScanCode"
                    ? [
                        styles.activeTabText,
                        { marginTop: Metrics.WIDTH * 0.01 }
                      ]
                    : [
                        styles.normalTabText,
                        { marginTop: Metrics.WIDTH * 0.01 }
                      ]
                }
              >
                Scan Code
              </Text>
            </Button>
            <Button
              vertical
              onPress={() => this.setState({ selectedTab: "Invoices" })}
            >
              {this.state.selectedTab == "Invoices" ? (
                <Ionicons
                  name="ios-albums"
                  size={24}
                  color="#00bff3"
                  style={{ justifyContent: "center" }}
                />
              ) : (
                <Ionicons name="ios-albums" size={24} color="#929292" />
              )}
              <Text
                style={
                  this.state.selectedTab == "Invoices"
                    ? styles.activeTabText
                    : styles.normalTabText
                }
              >
                Invoices
              </Text>
            </Button>
            <Button
              vertical
              onPress={() => this.setState({ selectedTab: "Payments" })}
            >
              {this.state.selectedTab == "Payments" ? (
                <Image source={Images.activeGift} style={styles.tabIcon} />
              ) : (
                <Image source={Images.normalGift} style={styles.tabIcon} />
              )}
              <Text
                style={
                  this.state.selectedTab == "Payments"
                    ? [
                        styles.activeTabText,
                        { marginTop: Metrics.WIDTH * 0.01 }
                      ]
                    : [
                        styles.normalTabText,
                        { marginTop: Metrics.WIDTH * 0.01 }
                      ]
                }
              >
                Payments
              </Text>
            </Button>
            <Button
              vertical
              onPress={() => this.setState({ selectedTab: "Profile" })}
            >
              {this.state.selectedTab == "Profile" ? (
                <EvilIcons name="user" size={30} color="#00bff3" />
              ) : (
                <EvilIcons name="user" size={30} color="#929292" />
              )}
              <Text
                style={
                  this.state.selectedTab == "Profile"
                    ? styles.activeTabText
                    : styles.normalTabText
                }
              >
                Profile
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
