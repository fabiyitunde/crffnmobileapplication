import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  BackHandler,
  I18nManager,
  AsyncStorage,
  ScrollView
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
import styles from "./styles";
import { Images, Fonts, Metrics, Colors } from "../../Themes/";
import { connect } from "react-redux";
import MemberInvoiceList from "../memberinvoicelist/memberinvoicelist";
import ScrollableTabView, {
  ScrollableTabBar
} from "../../UIComponents/react-native-scrollable-tab-view";
class MemberDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangePasswordClick() {
    this.props.navigation.navigate("ECommerceChangePassword");
  }

  onBackClick() {
    this.props.navigation.navigate("HomePage");
  }

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("HomePage");
      return true;
    });
  }

  _handleBagNavigation() {
    AsyncStorage.multiSet([["ArrivedFrom", "ECommerceMyInformation"]]);
    this.props.navigation.navigate("ECommerceMyBag");
  }

  _handleWishListNavigation() {
    AsyncStorage.multiSet([["ArrivedForWishList", "ECommerceMyInformation"]]);
    this.props.navigation.navigate("ECommerceWishList");
  }

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#0e1130", true);
      StatusBar.setTranslucent(true);
    }
    const { memberslist } = this.props;
    const crffnmasterid = this.props.navigation.getParam("crffnmasterid", "");
    const selectedmember = memberslist.find(a => a.Id == crffnmasterid);
    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor={"#0e1130"} style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={this.onBackClick.bind(this)}
            >
              <FontAwesome
                name={I18nManager.isRTL ? "angle-right" : "angle-left"}
                size={30}
                color="white"
                style={{ paddingRight: 20 }}
              />
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.textTitle}>Member Details</Text>
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
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => this._handleBagNavigation()}
            >
              <SimpleLineIcons
                name="handbag"
                size={20}
                style={styles.bagIcon}
              />
              <View style={styles.alertBg}>
                <Text style={styles.alertTxt}>3</Text>
              </View>
            </TouchableOpacity>
          </Right>
        </Header>
        <ScrollableTabView
          initialPage={0}
          tabBarUnderlineStyle={styles.tabUnderLine}
          tabBarBackgroundColor={"#383d5a"}
          tabBarActiveTextColor={"white"}
          tabBarInactiveTextColor={"rgba(255,255,255,0.4)"}
          tabBarTextStyle={styles.tabText}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <View tabLabel="Details">
            <View style={styles.mainView}>
              <View style={styles.mainRow}>
                <Image
                  source={{ uri: selectedmember.picturestring }}
                  style={styles.profileImg}
                />
              </View>
              <View style={styles.dividerHorizontal} />
              <View style={styles.mainRow}>
                <Text style={styles.labelText}>CRFFN Number</Text>
                <Text style={[styles.infoText, { color: "#0e1130" }]}>
                  {selectedmember.MembershipNumber}
                </Text>
              </View>

              <View style={styles.dividerHorizontal} />

              <View style={styles.mainRow}>
                <Text style={styles.labelText}>Name</Text>
                <Text style={[styles.infoText, { color: "#0e1130" }]}>
                  {selectedmember.CustomerName}
                </Text>
              </View>

              <View style={styles.dividerHorizontal} />

              <View style={styles.mainRow}>
                <Text style={styles.labelText}>Email</Text>
                <Text style={[styles.infoText, { color: "#0e1130" }]}>
                  {selectedmember.RegistrationUserEmail}
                </Text>
              </View>

              <View style={styles.dividerHorizontal} />

              <View style={styles.mainRow}>
                <Text style={styles.labelText}>Category</Text>
                <Text style={[styles.infoText, { color: "#0e1130" }]}>
                  {selectedmember.FreightForwaderCategoryDescr}
                </Text>
              </View>

              <View style={styles.dividerHorizontal} />

              <View style={styles.mainRow}>
                <Text style={styles.labelText}>PhoneNumber</Text>
                <Text style={[styles.infoText, { color: "#0e1130" }]}>
                  {selectedmember.CorrespondenceGSM}
                </Text>
              </View>

              <View style={styles.dividerHorizontal} />
            </View>
          </View>
          <View tabLabel="InvoiceList">
            <MemberInvoiceList
              crffnmasterid={crffnmasterid}
              navigation={this.props.navigation}
            />
          </View>
        </ScrollableTabView>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    memberslist: state.members.memberslist
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  {}
)(MemberDetails);
