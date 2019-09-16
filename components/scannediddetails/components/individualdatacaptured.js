import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import styles from "../styles";

const IndividualDataCaptured = ({ captureddata }) => {
  return (
    <View style={styles.contentBillingInformationBg}>
      <View style={styles.mainRow}>
        <Image
          source={{ uri: captureddata.passportphotograph }}
          style={styles.profileImg}
        />
      </View>
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
          <Text
            style={styles.fieldInfoTxt}
          >{`${captureddata.surname} ${captureddata.othernames}`}</Text>
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
          <Text style={styles.filedLabel}>Date Of Birth</Text>
          <Text style={styles.fieldInfoTxt}>{captureddata.dateofbirth}</Text>
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
          <Text style={styles.filedLabel}>LGA</Text>
          <Text style={styles.fieldInfoTxt}>
            {captureddata.lga.description}
          </Text>
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
          <Text style={styles.fieldInfoTxt}>{captureddata.phonenumber}</Text>
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

export default IndividualDataCaptured;
