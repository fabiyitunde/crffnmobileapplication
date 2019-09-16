import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import styles from "../styles";

const CertificatePrepared = ({ certificateinfo }) => {
  return (
    <View style={styles.contentBillingInformationBg}>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.filedRow}>
          <Text style={styles.filedLabel}>Membership No.</Text>
          <Text style={styles.fieldInfoTxt}>
            {certificateinfo.membershipnumber}
          </Text>
        </View>
        <View style={styles.fieldDivider} />
      </View>

      <View style={{ flexDirection: "column" }}>
        <View style={styles.filedRow}>
          <Text style={styles.filedLabel}>Name</Text>
          <Text style={styles.fieldInfoTxt}>{certificateinfo.name}</Text>
        </View>
        <View style={styles.fieldDivider} />
      </View>

      <View style={{ flexDirection: "column" }}>
        <View style={styles.filedRow}>
          <Text style={styles.filedLabel}>Category</Text>
          <Text style={styles.fieldInfoTxt}>
            {certificateinfo.category.description}
          </Text>
        </View>
        <View style={styles.fieldDivider} />
      </View>
    </View>
  );
};

export default CertificatePrepared;
