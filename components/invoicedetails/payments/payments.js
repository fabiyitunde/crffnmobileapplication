import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import styles from "./styles";
import { Images, Fonts, Metrics, Colors } from "../../../Themes/";
const Payments = ({ paymentlist }) => {
  if (!paymentlist) return null;
  return (
    <ScrollView>
      {paymentlist.map((item, index) => {
        return (
          <View
            style={
              item.id === 1
                ? [styles.rowBg, { marginTop: Metrics.WIDTH * 0.05 }]
                : styles.rowBg
            }
            key={index}
          >
            <View style={styles.rowField}>
              <Text style={styles.fieldLabelTxt}>Gateway</Text>
              <Text style={styles.fieldDescriptionTxt}>
                {item.paymentgateway}
              </Text>
            </View>
            <View style={styles.rowListDivider} />

            <View style={styles.rowField}>
              <Text style={styles.fieldLabelTxt}>Date</Text>
              <Text style={styles.fieldDescriptionTxt}>{item.transdate}</Text>
            </View>
            <View style={styles.rowListDivider} />

            <View style={styles.rowField}>
              <Text style={styles.fieldLabelTxt}>Trans. Ref</Text>
              <Text style={styles.fieldDescriptionTxt}>{item.transref}</Text>
            </View>
            <View style={styles.rowListDivider} />

            <View style={styles.rowField}>
              <Text style={styles.fieldLabelTxt}>Status</Text>
              <Text
                style={
                  item.status == "Complete"
                    ? [styles.fieldDescriptionTxt, { color: "#ffc700" }]
                    : [styles.fieldDescriptionTxt, { color: "#ff0000" }]
                }
              >
                {item.status}
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Payments;
