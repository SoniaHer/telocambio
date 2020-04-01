/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Constants, Styles, Tools } from "@common";

import MiniBanner from "./MiniBanner";
import Item from "./Item";

/**
 * TODO: refactore
 */
export default class LayoutItem extends PureComponent {
  static propTypes = {
    layout: PropTypes.number.isRequired,
  };

  static defaultProps = {
    layout: Constants.Layout.threeColumn,
  };

  _getProps = () => {
    const { onPress, product, index, imageURI } = this.props;
    const size = this._getSizeItem();
    let props = {};

    if (!product && imageURI) {
      props = {
        onPress,
        imageURI,
        size,
        index
      };
    } else {
      const imageURI = Tools.getProductImage(
        product.defaultImage,
        Styles.window.width
      );
      const productPrice = `${Tools.getPrice(product.price)} `;
      const productPriceSale = product.onSale
        ? `${Tools.getPrice(product.regularPrice)} `
        : null;
      props = {
        onPress,
        imageURI,
        title: product.title,
        product,
        productPrice,
        productPriceSale,
        index,
        size,
      };
    }

    return props;
  };

  _getSizeItem = () => {
    return Styles.LayoutCard[`layout${this.props.layout}`];
  };

  render() {
    const { layout } = this.props;
    const props = this._getProps();

    switch (layout) {
      case Constants.Layout.miniBanner:
        return <MiniBanner {...props} />;

      default:
        return <Item {...props} />;
    }
  }
}
