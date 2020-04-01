/** @format */

import React, { PureComponent } from "react";
import { Text, View, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import { withTheme } from "@callstack/react-theme-provider";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import {
  removeCartItem,
  checkoutLinkUser,
  updateCheckoutShippingAddress,
} from "@redux/operations";
import { ProductItemContainer } from "@containers";
import { Button, ShopButton } from "@components";
import { Languages, Tools, Styles } from "@common";
import styles from "./styles";

const mapStateToProps = ({ carts, country, user }) => {
  return {
    cartItems: carts.cartItems,
    totalPrice: carts.totalPrice,
    checkoutId: carts.checkoutId,
    isFetching: carts.isFetching,

    countries: country.list,
    accessToken: user.accessToken,
    userInfo: user.userInfo,
  };
};

/**
 * TODO: improve later
 */
@withTheme
@connect(
  mapStateToProps,
  { removeCartItem, checkoutLinkUser, updateCheckoutShippingAddress }
)
@withNavigation
export default class MyCart extends PureComponent {
  // componentDidMount() {
  //   if (this.props.accessToken) {
  //     this._linkUserWithCheckout(this.props);
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.accessToken && nextProps.checkoutId) {
  //     if (this.props.accessToken !== nextProps.accessToken) {
  //       this._linkUserWithCheckout(nextProps);
  //     }
  //   }
  // }

  // if have user link account
  _linkUserWithCheckout = () => {
    const { accessToken, checkoutId } = this.props;
    return this.props
      .checkoutLinkUser({ accessToken, checkoutId })
      .then((data) => {
        return data;
      });
  };

  // check user existed and link user to checkout then update shipping address
  _onPress = () => {
    if (!this.props.accessToken) {
      this.props.navigation.navigate("Login");
    } else {
      this._linkUserWithCheckout().then((data) => {
        if (data && !data.error) {
          this._handleCheckoutUpdateAddress();
          this.props.onChangeTab(this.props.index + 1);
        }
      });
    }
  };

  _handleCheckoutUpdateAddress = () => {
    const { userInfo, checkoutId } = this.props;
    if (userInfo && userInfo.defaultAddress) {
      const shippingAddress = Tools.getAddress(userInfo.defaultAddress);
      this.props.updateCheckoutShippingAddress({
        checkoutId,
        shippingAddress,
      });
    }
  };

  _getExistCoupon = () => {
    const { coupon } = this.state;
    const { couponCode, couponAmount, discountType } = this.props;
    return Tools.getCoupon(couponCode, couponAmount, coupon, discountType);
  };

  _removeCartItem = (id) => {
    const { checkoutId } = this.props;
    this.props.removeCartItem({ id, checkoutId });
  };

  _hasCartItems = () => {
    return this.props.cartItems && this.props.cartItems.length > 0;
  };

  _handleNavigate = () => {
    this.props.navigation.navigate("Home");
  };

  _renderEmptyCart = () => {
    return (
      <View>
        <Text style={styles.emptyText}>{Languages.ShoppingCartIsEmpty}</Text>
        <ShopButton
          onPress={this._handleNavigate}
          style={styles.button(this.props.theme)}
          text={Languages.ShopNow}
        />
      </View>
    );
  };

  render() {
    const { cartItems, totalPrice } = this.props;

    return (
      <View style={Styles.Common.CheckoutBoxContainer}>
        <View style={Styles.Common.CheckoutBox}>
          <ScrollView
            contentContainerStyle={Styles.Common.CheckoutBoxScrollView}>
            <View style={styles.list}>
              {this._hasCartItems()
                ? cartItems.map((item, index) => {
                    const { variant } = item;
                    return (
                      <ProductItemContainer
                        key={index.toString()}
                        viewQuantity
                        showImage
                        showRemove
                        id={item.id}
                        product={variant.product}
                        variant={variant}
                        quantity={item.quantity}
                        attributes={item.attributes}
                        removeCartItem={this._removeCartItem}
                      />
                    );
                  })
                : this._renderEmptyCart()}
            </View>
          </ScrollView>

          {this._hasCartItems() && (
            <View style={[styles.row, styles.summary]}>
              <Text style={styles.label}>{Languages.TotalPrice}</Text>
              <Animatable.Text animation="fadeInDown" style={styles.value}>
                {Tools.getPrice(totalPrice)}
              </Animatable.Text>
            </View>
          )}
        </View>
        {this._hasCartItems() && (
          <Button
            style={Styles.Common.CheckoutButtonBottom}
            text={Languages.Checkout}
            onPress={this._onPress}
            isLoading={this.props.isFetching}
            textStyle={Styles.Common.CheckoutButtonText}
            type="bottom"
          />
        )}
      </View>
    );
  }
}
