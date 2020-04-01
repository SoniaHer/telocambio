/** @format */

import React, { PureComponent } from "react";
import { Text, View, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import { withTheme } from "@callstack/react-theme-provider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ShopButton } from "@components";
import { Languages, Color, Constants, Styles } from "@common";

@withTheme
@withNavigation
export default class FinishOrder extends PureComponent {
  _handleNavigate = () => {
    this.props.navigation.navigate("MyOrdersScreen");
  };

  render() {
    return (
      <View style={Styles.Common.CheckoutBoxContainer}>
        <View style={Styles.Common.CheckoutBox}>
          <ScrollView
            contentContainerStyle={Styles.Common.CheckoutBoxScrollView}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="ios-checkmark-circle"
                size={80}
                color="#141414"
              />
            </View>

            <Text style={styles.title}>{Languages.ThankYou}</Text>
            <Text style={styles.message}>{Languages.FinishOrder}</Text>
            <ShopButton
              onPress={this._handleNavigate}
              style={styles.button(this.props.theme)}
              text={Languages.ViewMyOrders}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 40,
    fontFamily: Constants.fontFamilyBold,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  message: {
    textAlign: "center",
    fontSize: 15,
    color: "gray",
    lineHeight: 25,
    margin: 20,
    fontFamily: Constants.fontFamily,
  },
  button: (theme) => ({
    height: 40,
    width: 160,
    borderRadius: 20,
    backgroundColor: "#141414",
  }),
};
