/** @format */

import React, { PureComponent } from "react";
import { View, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import { withTheme } from "@callstack/react-theme-provider";
import { getDefaultShippingAddress } from "@redux/selectors";
import { Button, CheckoutProductItem } from "@components";
import { Languages, Tools, Styles } from "@common";
import ShippingAddress from "./ShippingAddress";
import ShippingRates from "./ShippingRates";
import styles from "./styles";
import parentStyle from "../styles";

const mapStateToProps = (state) => {
  return {
    cartItems: state.carts.cartItems,
    isFetching: state.carts.isFetching,
    totalPrice: state.carts.totalPrice,
    subtotalPrice: state.carts.subtotalPrice,
    shippingSelected: state.carts.shippingSelected,
    shippingAddress: getDefaultShippingAddress(state),
  };
};

@withTheme
@connect(mapStateToProps)
export default class Checkout extends PureComponent {
  // need add shipping address
  _onPress = () => {
    const { shippingAddress, shippingSelected } = this.props;
    if (!shippingAddress) {
      alert(Languages.ShippingAddressError);
    } else if (!shippingSelected) {
      alert(Languages.ShippingMethodError);
    } else {
      this.props.onChangeTab(this.props.index + 1);
    }
  };

  _renderPriceItems = () => {
    return (
      <Text style={styles.priceItems(this.props.theme)}>
        {Tools.getPrice(this.props.subtotalPrice)}
      </Text>
    );
  };

  render() {
    const { totalPrice, cartItems } = this.props;
    const finalPrice = Tools.getFinalPrice(null, totalPrice);

    return (
      <View style={Styles.Common.CheckoutBoxContainer}>
        <View style={Styles.Common.CheckoutBox}>
          <ScrollView
            contentContainerStyle={Styles.Common.CheckoutBoxScrollView}>
            <View style={[styles.row, styles.borderBottom]}>
              <View style={styles.rowItem}>
                <View style={styles.headerRow}>
                  <Text style={styles.label}>
                    {Languages.Items.toUpperCase()}
                  </Text>
                  {this._renderPriceItems()}
                </View>
                {cartItems &&
                  cartItems.map((item, index) => {
                    return (
                      <CheckoutProductItem
                        key={index.toString()}
                        name={item.title}
                        quantity={item.quantity}
                        price={item.variant.price}
                      />
                    );
                  })}
              </View>
            </View>

            <View style={[styles.row, styles.borderBottom]}>
              <ShippingAddress />
            </View>

            <View style={styles.row}>
              <ShippingRates />
            </View>
          </ScrollView>

          <View style={[styles.row, styles.summary]}>
            <Text style={parentStyle.label}>{Languages.TotalPrice}</Text>
            <Animatable.Text animation="fadeInDown" style={parentStyle.value}>
              {Tools.getPrice(totalPrice)}
            </Animatable.Text>
          </View>
        </View>

        <Button
          style={Styles.Common.CheckoutButtonBottom}
          text={Languages.Pay}
          onPress={this._onPress}
          isLoading={this.props.isFetching}
          textStyle={Styles.Common.CheckoutButtonText}
          type="bottom"
        />
      </View>
    );
  }
}
