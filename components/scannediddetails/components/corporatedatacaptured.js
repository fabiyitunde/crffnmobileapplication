import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import styles from "../styles";

const CorporateDataCaptured = ({ captureddata }) => {
  return (
    <View style={styles.contentBillingInformationBg}>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.filedRow}>
          <Text style={styles.filedLabel}>Membership No.</Text>
          <Text style={styles.fieldInfoTxt}>
            {captureddata.membershipnumber}
          </Text>
        </View>
        <View style={styles.fieldDivider} />
      </View>

      <View style={{ flexDirection: "column" }}>
        <View style={styles.filedRow}>
          <Text style={styles.filedLabel}>Name</Text>
          <Text style={styles.fieldInfoTxt}>{captureddata.companyname}</Text>
        </View>
        <View style={styles.fieldDivider} />
      </View>

      <View style={{ flexDirection: "column" }}>
        <View style={styles.filedRow}>
          <Text style={styles.filedLabel}>Category</Text>
          <Text style={styles.fieldInfoTxt}>
            {captureddata.category.description}
          </Text>
        </View>
        <View style={styles.fieldDivider} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.filedRow}>
          <Text style={styles.filedLabel}>RC Nos</Text>
          <Text style={styles.fieldInfoTxt}>{captureddata.rCNos}</Text>
        </View>
        <View style={styles.fieldDivider} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.filedRow}>
          <Text style={styles.filedLabel}>State</Text>
          <Text style={styles.fieldInfoTxt}>
            {captureddata.state.description}
          </Text>
        </View>
        <View style={styles.fieldDivider} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.filedRow}>
          <Text style={styles.filedLabel}>Website</Text>
          <Text style={styles.fieldInfoTxt}>{captureddata.website}</Text>
        </View>
        <View style={styles.fieldDivider} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.filedRow}>
          <Text style={styles.filedLabel}>Email</Text>
          <Text style={styles.fieldInfoTxt}>{captureddata.email}</Text>
        </View>
        <View style={styles.fieldDivider} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.filedRow}>
          <Text style={styles.filedLabel}>Phone</Text>
          <Text style={styles.fieldInfoTxt}>{captureddata.phoneNumber}</Text>
        </View>
        <View style={styles.fieldDivider} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.filedRow}>
          <Text style={styles.filedLabel}>Address</Text>
          <Text style={styles.fieldInfoTxt}>{captureddata.address}</Text>
        </View>
        <View style={styles.fieldDivider} />
      </View>
    </View>
  );
};

export default CorporateDataCaptured;
