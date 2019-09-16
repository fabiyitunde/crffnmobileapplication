import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  ImageBackground,
  BackHandler,
  ScrollView,
  I18nManager,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import {
  Content,
  Container,
  Button,
  Icon,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Title,
  Segment,
  Label
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { Dropdown } from "react-native-material-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "./styles";
import { Fonts, Metrics, Colors, Images } from "../../Themes/";

import Invoice from "../invoicedetails/invoice/invoice";
import Payments from "../invoicedetails/payments/payments";
import {
  getauthorizationheaderconfig,
  getaxious
} from "../../services/axiosService";

var screenName = "";

export default class ScannedInvoiceDetails extends Component {
  constructor(props) {
    super(props);

    if (this.props.navigation.state.params) {
      const navParams = this.props.navigation.state.params;
      screenName = navParams.name;
    }

    this.state = {
      segment: 1,
      favoriteNotification: 1,
      cartNotification: 3,
      name: "",
      email: "",
      title: "",
      comment: "",
      rating: 0,
      ArrivedForProductDetailsTab: "",
      header: {},
      details: [],
      paymentlist: [],
      isProcessing: false
    };
  }
  componentDidMount() {
    this.setState({ isProcessing: true });
    const token = this.props.navigation.getParam("token", "");
    const axios = getaxious();
    getauthorizationheaderconfig().then(headers => {
      console.log(headers);
      const url = `/api/invoice/getInvoiceDetailInformationFromScannedQRCodeToken?token=${encodeURIComponent(
        token
      )}`;

      axios
        .get(url, { headers })
        .then(response => {
          console.log(response.data);
          const invoicedetail = response.data;
          this.setState({
            header: invoicedetail.invoiceheader,
            details: invoicedetail.lineitems,
            paymentlist: invoicedetail.paymentrequestlist,
            isProcessing: false
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({ isProcessing: false });
        });
    });
  }
  componentWillMount() {
    var that = this;

    AsyncStorage.multiGet(["ArrivedForProductDetailsTab"]).then(data => {
      this.setState({ ArrivedForProductDetailsTab: data[0][1] });

      console.log("PRODUCTDETAILTAB==");
      console.log(data[0][1]);
    });

    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.goBack(null);
      return true;
    });
  }

  _scrollToInput(reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.scrollToFocusedInput(reactNode);
  }

  _renderActiveComponent = () => {
    const { segment } = this.state;

    const { header, details, paymentlist } = this.state;
    // Details
    if (segment === 1) {
      return <Invoice header={header} details={details} />;
    }

    // Reviews
    if (segment === 2) {
      return <Payments paymentlist={paymentlist} />;
    }
  };

  _handleBagNavigation() {
    AsyncStorage.multiSet([["ArrivedFrom", "ECommerceProductDetailsTab"]]);
    this.props.navigation.navigate("ECommerceMyBag");
  }

  _handleWishListNavigation() {
    AsyncStorage.multiSet([
      ["ArrivedForWishList", "ECommerceProductDetailsTab"]
    ]);
    this.props.navigation.navigate("ECommerceWishList");
  }
  renderbody = () => {
    if (this.state.isProcessing == true)
      return <ActivityIndicator size="large" color="#0000ff" />;
    return (
      <KeyboardAwareScrollView>
        <View style={styles.content}>
          <Segment style={styles.segmentTabSec}>
            <Button
              first
              style={
                this.state.segment === 1
                  ? [
                      styles.segmentSelectedTab,
                      { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }
                    ]
                  : styles.segmentTab
              }
              active={this.state.segment === 1 ? true : false}
              onPress={() => this.setState({ segment: 1 })}
            >
              <Text
                style={
                  this.state.segment === 1 ? styles.activeTab : styles.normalTab
                }
              >
                Details
              </Text>
            </Button>

            <Button
              last
              style={
                this.state.segment === 1
                  ? styles.segmentTab
                  : [
                      styles.segmentSelectedTab,
                      { borderTopRightRadius: 5, borderBottomRightRadius: 5 }
                    ]
              }
              active={this.state.segment === 2 ? true : false}
              onPress={() => this.setState({ segment: 2 })}
            >
              <Text
                style={
                  this.state.segment === 2 ? styles.activeTab : styles.normalTab
                }
              >
                Payments Initiated
              </Text>
            </Button>
          </Segment>

          {this._renderActiveComponent()}
        </View>
      </KeyboardAwareScrollView>
    );
  };
  render() {
    const { ArrivedForProductDetailsTab } = this.state;

    StatusBar.setBarStyle("light-content", true);

    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#0e1130", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor={"#0e1130"} style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.goBack(null)}
            >
              <FontAwesome
                name={I18nManager.isRTL ? "angle-right" : "angle-left"}
                size={Fonts.moderateScale(30)}
                color="white"
                style={{ paddingRight: 20 }}
              />
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.textTitle}>Invoice Details</Text>
          </Body>
          <Right style={styles.right}>
            {ArrivedForProductDetailsTab ==
            "ECommerceProductDetailsWishList" ? null : (
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => this._handleWishListNavigation()}
              >
                <View style={styles.heartBg}>
                  <FontAwesome
                    name="heart"
                    size={Fonts.moderateScale(8)}
                    style={styles.heartIcon}
                  />
                </View>
                {this.state.favoriteNotification != 0 ? (
                  <View style={styles.alertBg}>
                    <Text style={styles.alertTxt}>1</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            )}
            {ArrivedForProductDetailsTab ==
            "ECommerceProductDetailsMyBag" ? null : (
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => this._handleBagNavigation()}
              >
                <SimpleLineIcons
                  name="handbag"
                  size={Fonts.moderateScale(18)}
                  style={styles.bagIcon}
                />
                {this.state.cartNotification != 0 ? (
                  <View style={styles.alertBg}>
                    <Text style={styles.alertTxt}>3</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            )}
          </Right>
        </Header>
        {this.renderbody()}
      </Container>
    );
  }
}
