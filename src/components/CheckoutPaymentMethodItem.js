/** @format */

import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Images, Constants } from "@common";
import { Button } from "@components";

export default class CheckoutPaymentMethodItem extends PureComponent {
  render() {
    const { index, item, selectedIndex, onPress } = this.props;
    return (
      <View style={styles.optionContainer}>
        <Button
          type="image"
          source={item.imageUrl}
          defaultSource={Images.defaultPayment}
          onPress={onPress}
          buttonStyle={[
            styles.btnOption,
            selectedIndex === index && styles.selectedBtnOption,
          ]}
          imageStyle={styles.imgOption}
        />
        <Text style={styles.text}>{item.name.toUpperCase()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  optionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnOption: {
    width: 120,
    height: 80,
    marginBottom: 5,
  },
  selectedBtnOption: {
    backgroundColor: "rgba(206, 215, 221, 0.6)",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 6,
  },
  imgOption: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "contain",
  },
  text: {
    fontFamily: Constants.fontFamily,
  },
});
