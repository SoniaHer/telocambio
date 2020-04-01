/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { updateCartItem } from "@redux/operations";
import { AddToCartIconContainer, WishListIconContainer } from "@containers";
import { ChangeQuantity } from "@components";
import { Tools, Color, Constants } from "@common";

const hitSlop = { top: 20, right: 10, bottom: 20, left: 10 };
const mapStateToProps = (state) => {
  return {
    checkoutId: state.carts.checkoutId,
  };
};

@withNavigation
@connect(
  mapStateToProps,
  { updateCartItem }
)
export default class ProductItemContainer extends PureComponent {
  static propTypes = {
    viewQuantity: PropTypes.bool.isRequired,
    showImage: PropTypes.bool.isRequired,
    showRemove: PropTypes.bool.isRequired,
    showAddToCart: PropTypes.bool.isRequired,
    showWishlist: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    viewQuantity: false,
    showImage: false,
    showRemove: false,
    showAddToCart: false,
    showWishlist: false,
  };

  _onChangeQuantity = (quantity) => {
    const { checkoutId, variant, id } = this.props;
    this.props.updateCartItem({ quantity, checkoutId, variant, id });
  };

  _removeCartItem = () => {
    this.props.removeCartItem(this.props.id);
  };

  _handlePress = () => {
    this.props.navigation.navigate("Detail", { item: this.props.product });
  };

  render() {
    const {
      product,
      quantity,
      viewQuantity,
      variant,
      showImage,
      showRemove,
      showAddToCart,
      showWishlist,
    } = this.props;
    const item = variant || product;
    const imageUrl =
      item.images && item.images.length ? item.images[0] : item.image;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {showRemove && (
            <TouchableOpacity
              style={styles.btnRemove}
              hitSlop={hitSlop}
              onPress={this._removeCartItem}>
              <Ionicons
                name="ios-remove-circle-outline"
                size={20}
                color={Color.Error}
              />
            </TouchableOpacity>
          )}
          {showImage && (
            <Image
              source={{ uri: Tools.getProductImage(imageUrl.src, 100) }}
              style={styles.image}
            />
          )}
          <View
            style={[
              styles.infoView,
              { width: Dimensions.get("window").width - 180 },
            ]}>
            <TouchableOpacity onPress={this._handlePress}>
              <Text style={styles.title}>{product.title}</Text>
            </TouchableOpacity>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{Tools.getPrice(item.price)}</Text>
              {variant &&
                variant.selectedOptions &&
                variant.selectedOptions.map((o) => {
                  return (
                    <Text key={o.name} style={styles.productVariant}>
                      {o.value}
                    </Text>
                  );
                })}
            </View>
          </View>
          {viewQuantity && (
            <ChangeQuantity
              quantity={quantity}
              onChangeQuantity={this._onChangeQuantity}
            />
          )}
          {showAddToCart && (
            <View style={styles.addToCartIcon}>
              <AddToCartIconContainer show product={product} size={24} />
            </View>
          )}
          {showWishlist && (
            <WishListIconContainer
              product={product}
              style={styles.wishlistIcon}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#d4dce1",
  },
  content: {
    flexDirection: "row",
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoView: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontFamily: Constants.fontFamily,
    color: Color.TextDefault,
  },
  priceContainer: {
    // flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    marginTop: 10,
    // alignItems: "center",
    // justifyContent: "flex-start",
    // flexWrap: "wrap",
  },
  price: {
    fontSize: 16,
    color: Color.Text,
    fontFamily: Constants.fontFamilyBold,
    marginBottom: 10,
  },
  productVariant: {
    fontSize: 15,
    color: Color.blackTextSecondary,
    fontFamily: Constants.fontFamily,
  },
  btnRemove: {
    justifyContent: "center",
    marginRight: 5,
  },
  addToCartIcon: {},
  wishlistIcon: {
    top: 40,
    right: -2,
  },
});
