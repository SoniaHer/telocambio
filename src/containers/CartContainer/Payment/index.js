/** @format */

import React, { PureComponent } from "react";
import { Text, ScrollView, View } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { checkoutFree } from "@redux/operations";
import { CheckoutPaymentMethodItem, Button } from "@components";
import { Languages, Styles, Constants } from "@common";

import styles from "./styles";

const mapStateToProps = ({ payment, carts }) => {
  return {
    paymentMethods: payment.paymentMethods,
    isFetching: payment.isFetching,

    checkoutId: carts.checkoutId,
  };
};

@withNavigation
@connect(
  mapStateToProps,
  { checkoutFree }
)
export default class Payment extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
  }

  _onSelectPaymentMethod = (index) => {
    this.setState({ selectedIndex: index });
  };

  _onPress = () => {
    const { paymentMethods, checkoutId } = this.props;
    const itemSelected = paymentMethods[this.state.selectedIndex];
    if (itemSelected.type === "card") {
      this.props.navigation.navigate("AddCreditCardScreen");
    } else {
      this.props.checkoutFree({ checkoutId });
    }
  };

  render() {
    const { paymentMethods } = this.props;

    return (
      <View style={Styles.Common.CheckoutBoxContainer}>
        <View style={Styles.Common.CheckoutBox}>
          <ScrollView
            contentContainerStyle={Styles.Common.CheckoutBoxScrollView}>
            <Text style={styles.label}>
              {Languages.SelectPayment.toUpperCase()}
            </Text>

            <View style={styles.paymentOption}>
              {paymentMethods.map((item, index) => {
                if (!item.enabled) return null;
                const onPress = () => this._onSelectPaymentMethod(index);
                return (
                  <CheckoutPaymentMethodItem
                    key={index.toString()}
                    item={item}
                    index={index}
                    selectedIndex={this.state.selectedIndex}
                    onPress={onPress}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>

        <Button
          style={Styles.Common.CheckoutButtonBottom}
          text={
            this.state.selectedIndex === 0
              ? Languages.ConfirmPay
              : Languages.Confirm
          }
          onPress={this._onPress}
          isLoading={this.props.isFetching}
          textStyle={Styles.Common.CheckoutButtonText}
          type="bottom"
        />
      </View>
    );
  }
}
