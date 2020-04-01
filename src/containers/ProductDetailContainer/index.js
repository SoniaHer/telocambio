/** @format */

import React, { Component } from "react";
import {
  View,
  Animated,
  FlatList,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { findIndex } from "lodash";
import { connect } from "react-redux";
import { addToCart } from "@redux/operations";
import { Styles, Tools, Config, Constants, Languages, Images } from "@common";
import { ModalPhotos, AdMob, LayoutItem, ProductTitle } from "@components";
import { ProductRelatedContainer } from "@containers";
import { toast } from "@app/Omni";

import Title from "./Title";
import AnotherAttributes from "./AnotherAttributes";
import ColorAttributes from "./ColorAttributes";
import BottomTabBar from "./BottomTabBar";
import styles from "./styles";

const PRODUCT_IMAGE_HEIGHT = 300;

const mapStateToProps = (state, props) => {
  const item = props.navigation.getParam("item");
  return {
    product: item,
    checkoutId: state.carts.checkoutId,
    total: state.carts.total,
    isFetching: state.carts.isFetching,
  };
};

@connect(
  mapStateToProps,
  { addToCart }
)
export default class ProductDetailContainer extends Component {
  constructor(props) {
    super(props);

    this.productInfoHeight = PRODUCT_IMAGE_HEIGHT;

    this.state = {
      scrollY: new Animated.Value(0),
      selectedOptions: {},
      selectedVariant: {},
    };
  }

  componentWillMount() {
    this._updateVariantAndOptions(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // update selecting another product in related product
    if (this.props.product !== nextProps.product) {
      this._updateVariantAndOptions(nextProps);
      this._scrollview &&
        this._scrollview.scrollTo({ x: 0, y: 0, animated: true });
    }
  }

  _updateVariantAndOptions = (props) => {
    if (props.product) {
      const defaultVarient = props.product && props.product.variants[0];
      let selectedOptions = {};
      props.product.options.forEach((selector) => {
        selectedOptions = {
          ...selectedOptions,
          [selector.name.toUpperCase()]: selector.values[0].value,
        };
      });
      this.setState({ selectedVariant: defaultVarient, selectedOptions });
    }
  };

  _getVariantImage = (variant) => {
    if (!variant) return this.state.selectedVariantImage;
    return Tools.getProductImage(variant.image.src, Styles.width);
  };

  _getPhotoIndex = (selectedVariant) => {
    const selectedVariantImage = this._getVariantImage(selectedVariant);
    const photoIndex = findIndex(this.props.product.images, (o) => {
      return o.src === selectedVariantImage;
    });

    return photoIndex < 0 ? 0 : photoIndex;
  };

  _openModalPhoto = (index) => {
    this._modalPhoto.openModal(index);
  };

  /**
   * TODO: change color update selectedOptions
   */
  _onSelectOption = (attrType, value) => {
    const { product } = this.props;
    const selectedOptions = this.state.selectedOptions;
    selectedOptions[attrType] = value;
    const selectedVariant = Tools.getVariant(product.variants, selectedOptions);

    // scroll photos to index
    const photoIndex = this._getPhotoIndex(selectedVariant);
    this._photos.scrollToIndex({ index: photoIndex });

    this.setState({
      selectedVariant,
      selectedOptions,
    });
  };

  /**
   * add to cart
   */
  _addToCart = (navigateToCart = false) => {
    const { addToCart, checkoutId, total } = this.props;
    const { selectedVariant } = this.state;

    if (total < Constants.LimitAddToCart) {
      addToCart({ checkoutId, variant: selectedVariant }).then((data) => {
        if (data && !data.error) {
          if (navigateToCart) {
            this.props.navigation.navigate("CartScreen");
          }
        }
      });
    } else {
      toast(Languages.ProductLimitWaring);
    }
  };

  _renderTitle = () => {
    return (
      <View style={Styles.Common.SpacingLayout}>
        <Title
          product={this.props.product}
          selectedVariant={this.state.selectedVariant}
        />
      </View>
    );
  };

  _renderAttributes = () => {
    const { product } = this.props;

    return (
      <AnotherAttributes
        onSelect={this._onSelectOption}
        options={product.options}
        variants={product.variants}
        selectedOptions={this.state.selectedOptions}
      />
    );
  };

  _renderProductColor = () => {
    const { product } = this.props;
    const variantColors = Tools.getAttribute(product, "color");

    return (
      <ColorAttributes
        onSelect={this._onSelectOption}
        scrollY={this.state.scrollY}
        options={variantColors ? variantColors.options : null}
        selectedOptions={this.state.selectedOptions}
      />
    );
  };

  _renderPhoto = ({ item, index }) => {
    const openModalPhoto = () => {
      this._openModalPhoto(index);
    };
    return (
      <LayoutItem
        index={index}
        imageURI={item.src}
        onPress={openModalPhoto}
        layout={Constants.Layout.miniBanner}
      />
    );
  };

  _renderImages = () => {
    const { product } = this.props;

    return (
      <FlatList
        contentContainerStyle={{ paddingLeft: Styles.spaceLayout }}
        ref={(comp) => (this._photos = comp)}
        data={product.images}
        renderItem={this._renderPhoto}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
      />
    );
  };

  _renderDescription = () => {
    return (
      <View style={Styles.Common.SpacingLayout}>
        <ProductTitle name={Languages.AdditionalInformation} />
        <Text style={styles.textDescription}>
          {this.props.product.description}
        </Text>
      </View>
    );
  };

  _renderBottomTabBar = () => {
    return (
      <BottomTabBar product={this.props.product} addToCart={this._addToCart} />
    );
  };


  _renderContentPhoto = () => {
    return (
      <View>
        <TouchableOpacity
          disabled={this.props.isFetching}
          style={styles.addtoCartButton}
          onPress={() => this._addToCart()}>
          <Image style={styles.iconAddCart} source={Images.IconAddCart} />
        </TouchableOpacity>
        {this._renderTitle()}
      </View>
    );
  };

  render() {
    const { product } = this.props;

    return (
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <ScrollView ref={(comp) => (this._scrollview = comp)}>
          <View style={styles.imageContainer}>{this._renderImages()}</View>
          <View style={styles.content}>
            {this._renderTitle()}
            <View style={styles.section}>{this._renderAttributes()}</View>

            <View style={styles.section}>{this._renderDescription()}</View>

          </View>

          {this._renderProductColor()}
        </ScrollView>

        {this._renderBottomTabBar()}

        <ModalPhotos
          ref={(comp) => (this._modalPhoto = comp)}
          photos={product.images}
          renderContent={this._renderContentPhoto}
          isFetching={this.props.isFetching}
        />
      </View>
    );
  }
}
