/** @format */

import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { getIsWishlistSelector } from "@redux/selectors";
import { addWishlistItem, removeWishlistItem } from "@redux/actions";

const mapStateToProps = (state, props) => ({
  isWishlist: getIsWishlistSelector(state, props.product),
});

@connect(
  mapStateToProps,
  { addWishlistItem, removeWishlistItem }
)
export default class WishlistIconContainer extends PureComponent {
  _toggleToWishlist = () => {
    const { product, isWishlist } = this.props;
    if (isWishlist) {
      this.props.removeWishlistItem(product);
    } else {
      this.props.addWishlistItem(product);
    }
  };

  render() {
    const { isWishlist, style } = this.props;

    return (
      <TouchableOpacity
        style={[styles.buttonStyle, style]}
        onPress={this._toggleToWishlist}>
        {isWishlist && <FontAwesome name="heart" size={20} color="red" />}
        {!isWishlist && (
          <FontAwesome name="heart-o" size={20} color="#b5b8c1" />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  imageButton: {
    width: 15,
    height: 15,
  },
  buttonStyle: {
    position: "absolute",
    right: 10,
    top: 5,
    zIndex: 9999,
  },
});
