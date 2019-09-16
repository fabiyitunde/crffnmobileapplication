import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  BackHandler,
  ScrollView,
  I18nManager,
  TextInput,
  Modal,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import {
  Content,
  Container,
  Right,
  Header,
  Left,
  Body,
  Title
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import { Images, Fonts, Metrics, Colors } from "../../Themes/";

import CertificatePrepared from "./components/certificateprepared";
import IndividualDataCaptured from "./components/individualdatacaptured";
import CorporateDataCaptured from "./components/corporatedatacaptured";
import { getdatacaptureaxious, getaxious } from "../../services/axiosService";
import { getIDdetailForScannedCode } from "./components/asyncmanager";
export default class ScannedIDDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      certificateregisterData: null,
      individualData: null,
      corporateData: null,
      selectedStep: 1,
      step2Type: "",
      selectedLots: "1",

      editInfoModelVisible: false,
      isProcessing: false
    };
  }
  componentDidMount() {
    const token = this.props.navigation.getParam("token", "");
    getIDdetailForScannedCode(token, stateobj => this.setState(stateobj));
  }
  async componentDidMountold() {
    try {
      this.setState({ isProcessing: true });
      const token = this.props.navigation.getParam("token", "");
      const axios = getaxious();
      const decryptionresponse = await axios.post(
        "/api/Parameters/getDecryptedToken",
        { token: token }
      );
      const datacaptureaxios = getdatacaptureaxious();
      const certificateregisterurl = `/api/certificateregister/getCertificateRegisterByMembershipNumber/${decryptionresponse.data.rffnumber}`;
      const certregisterresponse = await datacaptureaxios.get(
        certificateregisterurl
      );
      this.setState({
        certificateregisterData: certregisterresponse.data,
        isProcessing: false
      });
    } catch (error) {
      this.setState({ isProcessing: false });
      console.log("error", error);
    }
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.goBack(null);
      return true;
    });
  }

  toggleEditInfoModal(visible) {
    this.setState({ editInfoModelVisible: visible });
  }

  _handleEditInfomationModal() {
    this.setState({ editInfoModelVisible: false });
    this.toggleEditInfoModal(true);
  }

  onCheckBoxPress(id, isOpen) {
    console.log("==PAYMENT_METHOD11==");
    console.log(this.state.paymentMethod);

    this.setState({
      selectedLots: id
    });

    var temp = [];

    temp = this.state.paymentMethod.slice(); //copy array

    for (var i = 0; i < temp.length; i++) {
      if (id == i) {
        console.log("==PAYMENT_ID==");
        console.log(id);
        if (temp[i].isOpen == false) {
          temp[i].isOpen = true;
        } else {
          temp[i].isOpen = false;
        }
      } else {
        temp[i].isOpen = false;
      }
    }

    console.log("==PAYMENT_METHOD==");
    console.log(this.state.paymentMethod);

    this.setState({ paymentMethod: temp });
  }

  _renderSubHeader = () => {
    const { selectedStep } = this.state;

    if (selectedStep === 1) {
      return <Text style={styles.subHeaderTitle}>CERTIFICATE PREPARED</Text>;
    }

    if (selectedStep === 2) {
      return <Text style={styles.subHeaderTitle}>DATA CAPTURE</Text>;
    }

    if (selectedStep === 3) {
      return <Text style={styles.subHeaderTitle}>ID CARD ISSUED</Text>;
    }
  };

  _renderSelectStep = () => {
    const { selectedStep } = this.state;

    if (selectedStep === 1) {
      return (
        <View style={[styles.stepBg, { marginBottom: Metrics.HEIGHT * 0.04 }]}>
          <View style={[styles.stepCountBg, { backgroundColor: "#ffc700" }]}>
            <Text style={styles.stepCountTxt}>1</Text>
          </View>
          <View style={[styles.stepDistance, { backgroundColor: "#798c9c" }]} />
          <View style={[styles.stepCountBg, { backgroundColor: "#798c9c" }]}>
            <Text style={styles.stepCountTxt}>2</Text>
          </View>
          <View style={[styles.stepDistance, { backgroundColor: "#798c9c" }]} />
          <View style={[styles.stepCountBg, { backgroundColor: "#798c9c" }]}>
            <Text style={styles.stepCountTxt}>3</Text>
          </View>
        </View>
      );
    }

    if (selectedStep === 2) {
      return (
        <View style={[styles.stepBg, { marginBottom: Metrics.HEIGHT * 0.04 }]}>
          <View style={[styles.stepCountBg, { backgroundColor: "#ffc700" }]}>
            <Text style={styles.stepCountTxt}>1</Text>
          </View>
          <View style={[styles.stepDistance, { backgroundColor: "#ffc700" }]} />
          <View style={[styles.stepCountBg, { backgroundColor: "#ffc700" }]}>
            <Text style={styles.stepCountTxt}>2</Text>
          </View>
          <View style={[styles.stepDistance, { backgroundColor: "#798c9c" }]} />
          <View style={[styles.stepCountBg, { backgroundColor: "#798c9c" }]}>
            <Text style={styles.stepCountTxt}>3</Text>
          </View>
        </View>
      );
    }

    if (selectedStep === 3) {
      return (
        <View style={[styles.stepBg, { marginBottom: Metrics.HEIGHT * 0.03 }]}>
          <View style={[styles.stepCountBg, { backgroundColor: "#ffc700" }]}>
            <Text style={styles.stepCountTxt}>1</Text>
          </View>
          <View style={[styles.stepDistance, { backgroundColor: "#ffc700" }]} />
          <View style={[styles.stepCountBg, { backgroundColor: "#ffc700" }]}>
            <Text style={styles.stepCountTxt}>2</Text>
          </View>
          <View style={[styles.stepDistance, { backgroundColor: "#ffc700" }]} />
          <View style={[styles.stepCountBg, { backgroundColor: "#ffc700" }]}>
            <Text style={styles.stepCountTxt}>3</Text>
          </View>
        </View>
      );
    }
  };

  _renderActiveComponent = () => {
    const { selectedStep, step2Type } = this.state;

    const ProductImgOne =
      "https://antiqueruby.aliansoftware.net/Images/woocommerce/productOrderOne.png";
    const ProductImgTwo =
      "https://antiqueruby.aliansoftware.net/Images/woocommerce/productOrderTwo.png";

    if (this.state.isProcessing == true)
      return <ActivityIndicator size="large" color="#0000ff" />;
    if (selectedStep === 1 && this.state.certificateregisterData) {
      return (
        <CertificatePrepared
          certificateinfo={this.state.certificateregisterData}
        />
      );
    }

    if (selectedStep === 2 && step2Type === "I") {
      return (
        <IndividualDataCaptured captureddata={this.state.individualData} />
      );
    }
    if (selectedStep === 2 && step2Type === "C") {
      return <CorporateDataCaptured captureddata={this.state.corporateData} />;
    }
    if (selectedStep === 3) {
      return (
        <View style={styles.contentBg}>
          <Content>
            {productOrderList.map((item, index) => {
              return (
                <View key={index}>
                  <View
                    style={
                      item.id == 1
                        ? styles.orderListRowBg
                        : [
                            styles.orderListRowBg,
                            { marginTop: Metrics.WIDTH * 0.04 }
                          ]
                    }
                  >
                    <View style={styles.productDetailBg}>
                      <View style={styles.productTitlerow}>
                        <Text
                          style={[
                            styles.productTitleTxt,
                            { width: Metrics.WIDTH * 0.45 }
                          ]}
                        >
                          {item.productTile}
                        </Text>
                        <TouchableOpacity
                          style={styles.closeIconBg}
                          onPress={() => alert("close")}
                        >
                          <FontAwesome
                            name="close"
                            size={10}
                            style={styles.closeImg}
                          />
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.priceTxt}>{item.productPrice}</Text>

                      <View
                        style={[
                          styles.detailFieldRow,
                          { marginTop: Metrics.WIDTH * 0.06 }
                        ]}
                      >
                        <Text
                          style={[
                            styles.productTitleTxt,
                            { width: Metrics.WIDTH * 0.24 }
                          ]}
                        >
                          Size
                        </Text>
                        <Text style={styles.productTitleTxt}>{item.size}</Text>
                      </View>

                      <View style={styles.detailFieldRow}>
                        <Text
                          style={[
                            styles.productTitleTxt,
                            { width: Metrics.WIDTH * 0.24 }
                          ]}
                        >
                          Color
                        </Text>
                        <View
                          style={[
                            styles.colorViewer,
                            { backgroundColor: item.color }
                          ]}
                        />
                      </View>

                      <View style={styles.detailFieldRow}>
                        <Text
                          style={[
                            styles.productTitleTxt,
                            { width: Metrics.WIDTH * 0.24 }
                          ]}
                        >
                          Quantity
                        </Text>
                        <Text style={styles.productTitleTxt}>
                          {item.quantity}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={
                      item.id === this.state.data.length
                        ? null
                        : styles.orderListDivider
                    }
                  />
                </View>
              );
            })}
            <View style={styles.totalBg}>
              <View>
                <View style={styles.totalFieldRow}>
                  <Text
                    style={[
                      styles.productTitleTxt,
                      { width: Metrics.WIDTH * 0.25 }
                    ]}
                  >
                    Subtotal
                  </Text>
                  <Text
                    style={[
                      styles.productTitleTxt,
                      { textAlign: "right", width: Metrics.WIDTH * 0.65 }
                    ]}
                  >
                    $520.00
                  </Text>
                </View>
                <View style={styles.totalFieldDivider} />
              </View>
              <View>
                <View style={styles.totalFieldRow}>
                  <Text
                    style={[
                      styles.productTitleTxt,
                      { width: Metrics.WIDTH * 0.25 }
                    ]}
                  >
                    Shipping
                  </Text>
                  <Text
                    style={[
                      styles.productTitleTxt,
                      { textAlign: "right", width: Metrics.WIDTH * 0.65 }
                    ]}
                  >
                    Free
                  </Text>
                </View>
                <View style={styles.totalFieldDivider} />
              </View>
              <View style={styles.totalFieldRow}>
                <Text
                  style={[styles.totalTxt, { width: Metrics.WIDTH * 0.25 }]}
                >
                  Total
                </Text>
                <Text
                  style={[
                    styles.totalTxt,
                    { textAlign: "right", width: Metrics.WIDTH * 0.65 }
                  ]}
                >
                  $520.00
                </Text>
              </View>
            </View>

            <View style={styles.subHeaderBg}>
              <Text style={styles.subHeaderTitle}>BILLING INFORMATION</Text>
            </View>

            <View style={styles.bilingInfoBg}>
              <View style={styles.billingInfoHeaderBg}>
                <Text style={styles.bilingInfoHeaderLabel}>Hoang.Thai</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ selectedStep: 1 })}
                >
                  <Text style={styles.editTxt}>Edit</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.billingInfo}>
                <Text
                  style={[
                    styles.billingInfoLabel,
                    { width: Metrics.WIDTH * 0.18 }
                  ]}
                >
                  Address
                </Text>
                <Text style={styles.billingInfoLabel}> :</Text>
                <Text style={styles.productTitleTxt}>
                  Ton Duc Thang - Da Nang
                </Text>
              </View>

              <View style={styles.billingInfo}>
                <Text
                  style={[
                    styles.billingInfoLabel,
                    { width: Metrics.WIDTH * 0.18 }
                  ]}
                >
                  Phone
                </Text>
                <Text style={styles.billingInfoLabel}> :</Text>
                <Text style={styles.productTitleTxt}>0905070017</Text>
              </View>

              <View style={styles.billingInfo}>
                <Text
                  style={[
                    styles.billingInfoLabel,
                    { width: Metrics.WIDTH * 0.18 }
                  ]}
                >
                  Email
                </Text>
                <Text style={styles.billingInfoLabel}> :</Text>
                <Text style={styles.productTitleTxt}>hong8x.pts@gmail.com</Text>
              </View>
            </View>

            <View style={styles.subHeaderBg}>
              <Text style={styles.subHeaderTitle}>PAYMENT METHOD</Text>
            </View>

            <View style={styles.paymentBg}>
              <View style={[styles.billingInfo, { alignItems: "center" }]}>
                <Image
                  source={Images.visaCard}
                  style={styles.orderPaymentImage}
                />
                <Text
                  style={[
                    styles.bilingInfoHeaderLabel,
                    { marginLeft: Metrics.WIDTH * 0.04 }
                  ]}
                >
                  Visa
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({ selectedStep: 2 })}
              >
                <Text style={styles.editTxt}>Edit</Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.orderListDivider,
                { marginBottom: Metrics.WIDTH * 0.08 }
              ]}
            />
          </Content>
        </View>
      );
    }
  };

  _renderFooter = () => {
    const { selectedStep } = this.state;

    if (selectedStep === 1) {
      return (
        <TouchableOpacity
          style={styles.footerTxtBg}
          onPress={() => this.setState({ selectedStep: 2 })}
        >
          <Text style={styles.footerTxt}>Continue</Text>
        </TouchableOpacity>
      );
    }

    if (selectedStep === 2) {
      return (
        <TouchableOpacity
          style={styles.footerTxtBg}
          onPress={() => this.setState({ selectedStep: 3 })}
        >
          <Text style={styles.footerTxt}>Continue</Text>
        </TouchableOpacity>
      );
    }

    if (selectedStep === 3) {
      return (
        <TouchableOpacity
          style={styles.footerTxtBg}
          onPress={() => alert("Place Order")}
        >
          <Text style={styles.footerTxt}>Order Now</Text>
        </TouchableOpacity>
      );
    }
  };

  onItemClick() {
    // this.props.navigation.navigate("ECommerceMyBag");
    this.props.navigation.goBack(null);
  }

  _handleBagNavigation() {
    AsyncStorage.multiSet([["ArrivedFrom", "ECommerceCheckout"]]);
    this.props.navigation.navigate("ECommerceMyBag");
  }

  _handleWishListNavigation() {
    AsyncStorage.multiSet([["ArrivedForWishList", "ECommerceCheckout"]]);
    this.props.navigation.navigate("ECommerceWishList");
  }

  render() {
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
              onPress={this.onItemClick.bind(this)}
            >
              <FontAwesome
                name={I18nManager.isRTL ? "angle-right" : "angle-left"}
                size={35}
                color="white"
                style={{ paddingRight: 20 }}
              />
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.textTitle}>Registration</Text>
          </Body>
          <Right style={styles.right}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => this._handleWishListNavigation()}
            >
              <View style={styles.heartBg}>
                <FontAwesome name="heart" size={8} style={styles.heartIcon} />
              </View>
              <View style={styles.alertBg}>
                <Text style={styles.alertTxt}>1</Text>
              </View>
            </TouchableOpacity>
          </Right>
        </Header>

        <View style={styles.subHeaderBg}>{this._renderSubHeader()}</View>

        <View style={styles.subHeaderBottomLine} />

        <View>{this._renderSelectStep()}</View>

        <ScrollView>{this._renderActiveComponent()}</ScrollView>

        {/* <View style={styles.footerBg}>{this._renderFooter()}</View> */}
      </Container>
    );
  }
}
