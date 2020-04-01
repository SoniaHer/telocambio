/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { withTheme } from "@callstack/react-theme-provider";
import { connect } from "react-redux";
import { addToCart } from "@redux/operations";
import { getDefaultProductVariant } from "@redux/selectors";
import { Button } from "@components";
import { Constants, Color } from "@common";

const mapStateToProps = (state, props) => ({
  defaultProductVariant: getDefaultProductVariant(props.product),
  checkoutId: state.carts.checkoutId,
  total: state.carts.total,
});

@withTheme
@connect(
  mapStateToProps,
  { addToCart }
)
export default class AddToCartIconContainer extends PureComponent {
  static propTypes = {
    size: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    size: 20,
    show: false,
  };

  _addToCart = () => {
    const { addToCart, checkoutId, total, defaultProductVariant } = this.props;

    if (total < Constants.LimitAddToCart) {
      addToCart({ checkoutId, variant: defaultProductVariant });
    } else {
      alert(Languages.ProductLimitWaring);
    }
  };

  render() {
    const { theme } = this.props;
    if (!Constants.ShowQuickCart && !this.props.show) return null;
    return (
      <Button
        type="icon"
        transparent
        icon={
          <Ionicons
            name="ios-cart-outline"
            size={this.props.size}
            color={"#141414"}
          />
        }
        onPress={this._addToCart}
      />
    );
  }
}
