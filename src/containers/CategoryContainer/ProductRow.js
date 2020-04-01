/**
 * Created by InspireUI on 06/03/2017.
 *
 * @format
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { withTheme } from "@callstack/react-theme-provider";
import { connect } from "react-redux";
import { Styles, Color, Constants, Tools, Config } from "@common";
import { WishListIconContainer } from "@containers";
import { Rating, ImageCache, Text } from "@components";

const mapStateToProps = (state) => {
  return {
    categoryLayoutMode: state.category.categoryLayoutMode,
  };
};

/**
 * TODO: refactor components
 */
@withTheme
@connect(mapStateToProps)
export default class ProductRow extends PureComponent {
  static propTypes = {
    product: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    categoryLayoutMode: PropTypes.string,
  };

  render() {
    const { product, onPress, categoryLayoutMode, theme } = this.props;

    const isListMode =
      categoryLayoutMode === Config.CategoryLayout.ListMode ||
      categoryLayoutMode === Config.CategoryLayout.CardMode;
    const isCardMode = categoryLayoutMode === Config.CategoryLayout.CardMode;

    const textStyle = isListMode ? styles.text_list : styles.text_grid;
    const imageStyle = isListMode ? styles.image_list : styles.image_grid;
    const image_width = isListMode
      ? Styles.width * 0.9 - 2
      : Styles.width * 0.45 - 2;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[
          styles.container,
          isListMode ? styles.container_list : styles.container_grid,
        ]}>
        <ImageCache
          uri={Tools.getProductImage(product.images[0].src, image_width)}
          style={[styles.image, imageStyle]}
        />
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={[textStyle, isCardMode && styles.cardText]}>
            {product.title}
          </Text>

          <View
            style={{
              flexDirection: isCardMode ? "column" : "row",
              justifyContent:
                categoryLayoutMode === Config.CategoryLayout.ListMode
                  ? "space-between"
                  : "flex-start",
              alignItems: isCardMode ? "center" : "flex-start",
              marginTop: 4,
            }}>
            <View
              style={[styles.price_wrapper, !isListMode && { marginTop: 0 }]}>
              <Text
                style={[
                  textStyle,
                  styles.price,
                  isCardMode && styles.cardPrice,
                  !isListMode && { color: Color.blackTextSecondary },
                ]}>
                {`${Tools.getPrice(product.price)} `}
              </Text>

              <Text
                style={[
                  textStyle,
                  styles.salePrice,
                  isCardMode && styles.cardPriceSale,
                ]}>
                {product.onSale && product.regularPrice > 0
                  ? Tools.getPrice(product.regularPrice)
                  : ""}
              </Text>

              {product.onSale && product.regularPrice > 0 && (
                <View style={styles.saleWrap(theme)}>
                  <Text style={[textStyle, styles.sale_off]}>
                    {Tools.getPriceDiscount(product)}
                  </Text>
                </View>
              )}
            </View>

            {isListMode && (
              <View style={styles.price_wrapper}>
                <Rating
                  rating={Number(product.averageRating)}
                  size={
                    (isListMode
                      ? Styles.FontSize.medium
                      : Styles.FontSize.small) + 5
                  }
                />
                {product.ratingCount !== 0 && (
                  <Text
                    style={[
                      textStyle,
                      styles.textRating,
                      { color: Color.blackTextDisable },
                    ]}>
                    {`(${product.ratingCount})`}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
        {/** ** add wish list *** */}
        <WishListIconContainer product={product} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingBottom: 10,
    marginHorizontal: Styles.width / 20,
    marginTop: 10,
  },
  container_list: {
    width: Styles.width * 0.9,
    marginLeft: Styles.width * 0.05,
    marginRight: Styles.width * 0.05,
    marginTop: Styles.width * 0.05,
  },
  container_grid: {
    width: (Styles.width * 0.9) / 2,
    marginLeft: (Styles.width * 0.1) / 3,
    marginRight: 0,
    marginTop: (Styles.width * 0.1) / 3,
  },
  image: {
    marginBottom: 8,
  },
  image_list: {
    width: Styles.width * 0.9 - 2,
    height: Styles.width * 0.9 * Styles.thumbnailRatio,
  },
  image_grid: {
    width: Styles.width * 0.45 - 2,
    height: Styles.width * 0.45 * Styles.thumbnailRatio,
  },
  text_list: {
    color: Color.black,
    fontSize: Styles.FontSize.medium,
    fontFamily: Constants.fontFamily,
  },
  text_grid: {
    color: Color.black,
    fontSize: Styles.FontSize.small,
    fontFamily: Constants.fontFamily,
  },
  textRating: {
    fontSize: Styles.FontSize.small,
  },
  price_wrapper: {
    ...Styles.Common.Row,
    top: 0,
  },
  cardWraper: {
    flexDirection: "column",
  },
  salePrice: {
    textDecorationLine: "line-through",
    color: Color.blackTextDisable,
    marginLeft: 0,
    marginRight: 0,
    fontSize: Styles.FontSize.small,
  },
  cardPriceSale: {
    fontSize: 15,
    marginTop: 2,
    fontFamily: Constants.fontFamily,
  },
  price: {
    color: Color.black,
    fontSize: Styles.FontSize.medium,
  },
  saleWrap: (theme) => ({
    borderRadius: 5,
    backgroundColor: "#141414",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    marginLeft: 5,
  }),
  sale_off: {
    color: Color.lightTextPrimary,
    fontSize: Styles.FontSize.small,
  },
  cardText: {
    fontSize: 20,
    textAlign: "center",
  },
  cardPrice: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: Constants.fontFamily,
  },
  btnWishList: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
  },
});
