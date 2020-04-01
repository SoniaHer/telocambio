/** @format */

import React, { Component } from "react";
import { FlatList, RefreshControl, View, Text, Animated } from "react-native";
import { withNavigation } from "react-navigation";
import { withTheme } from "@callstack/react-theme-provider";
import { connect } from "react-redux";
import moment from "moment";
import {
  fetchAllProductsLayout,
  fetchAllProducts,
  fetchMoreAllProducts
} from "@redux/operations";
import { HorizontalList, VerticalList } from "@components";
import { Constants, Styles, Config, HorizonLayouts } from "@common";
import ProductRow from "@containers/CategoryContainer/ProductRow";
import VerticalItemBanner from "./VerticalItemBanner";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const mapStateToProps = ({ layout, products, app }) => ({
  layoutFetching: layout.isFetching,
  // default when vertical layout
  layoutMode: Constants.Layout.twoColumn,
  // vertical mode
  list: products.list,
  hasNextPage: products.hasNextPage,
  productFetching: products.isFetching,
  cursor: products.cursor,
  shopify: app.shopify,
});

const mapDispatchToProps = {
  fetchAllProductsLayout,
  fetchAllProducts,
  fetchMoreAllProducts
};

@withTheme
@connect(
  mapStateToProps,
  mapDispatchToProps
)
// @withNavigation
export default class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: moment().format("dddd, DD MMM YYYY"),
    };

    this.scrollAnimation = new Animated.Value(0);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      animatedHeader: this.scrollAnimation.interpolate({
        inputRange: [0, 170],
        outputRange: [-1, 1],
        extrapolate: "clamp",
      }),
    });
  }

  componentDidMount() {
    this._fetchAll();
  }

  componentWillReceiveProps(nextProps) {
    this._handleLoad(nextProps);
  }

  _handleLoad = (newProps) => {
    const { layoutMode } = this.props;
    if (newProps.layoutMode !== layoutMode) {
      // handle load when switch layout vertical list
      if (
        (newProps.list && newProps.list.length === 0) ||
        this._isHorizontal(newProps.layoutMode)
      ) {
        this._fetchAll(newProps.layoutMode);
      }
    }
  };

  _fetchAll = (layoutMode) => {
    if (!this._isHorizontal(layoutMode)) {
      this.props.fetchAllProducts(Config.HomePage.PageSize);
    } else {
      this.props.fetchAllProductsLayout();
    }
  };

  _loadMore = () => {
    const { hasNextPage, cursor } = this.props;
    if (hasNextPage && cursor) {
      this.props.fetchMoreAllProducts({ cursor });
    }
  };

  _isHorizontal = () => {
    return Config.HomePage.Horizon;
  };

  _onPressSeeMore = (index, name) => {
    this.props.navigation.navigate("ListAllScreen", { index, name });
  };

  // _onPressItem = (item, isNews) => {
  //   if (isNews) {
  //     this.props.navigation.navigate("News", { item });
  //   } else {
  //     this.props.navigation.navigate("Detail", { item });
  //   }
  // };

  _renderLoading = () => {
    return this.props.isFetching;
  };

  _renderHeader = () => {
    const { shopify, theme } = this.props;
    return (
      <View style={styles.header}>
        <Text style={styles.headerDate}>{this.state.currentDate}</Text>
        <Text style={styles.headerStore(theme)}>{shopify.appName}</Text>
      </View>
    );
  };

  _renderHorizontalList = ({ item, index }) => {
    return (
      <View style={styles.section}>
        <HorizontalList
          {...item}
          index={index}
          onPressSeeMore={this._onPressSeeMore}
        />
      </View>
    );
  };

  _onPressItem = (item) => {
    this.props.navigation.navigate("Detail", { item });
  };

  _renderRowItem = (item, index) => {
    const onPress = () => this._onPressItem(item);

    if (index === 0) {
      return (
        <VerticalItemBanner
          index={index}
          product={item}
          onPress={onPress}
          layout={Constants.Layout.miniBanner}
          horizontal={false}
        />
      );
    }

    return <ProductRow product={item} onPress={onPress} />;
  };

  /**
   * TODO: change to VerticalList component
   */
  _renderVerticalList = () => {
    const { list, layoutMode, productFetching, hasNextPage } = this.props;
    const onScroll = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this.scrollAnimation,
            },
          },
        },
      ],
      { useNativeDriver: true }
    );

    return (
      <VerticalList
        list={list}
        layout={layoutMode}
        isFetching={productFetching}
        onPressSeeMore={this._onPressSeeMore}
        onLoadMore={this._loadMore}
        onRefetch={this._fetchAll}
        hasNextPage={hasNextPage}
        renderHeader={this._renderHeader}
        onScroll={onScroll}
        renderRow={this._renderRowItem}
        numColumns={2}
      />
    );
  };

  render() {
    const { dataLayout, layoutFetching, list, theme } = this.props;


    const onScroll = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this.scrollAnimation,
            },
          },
        },
      ],
      { useNativeDriver: true }
    );
    // render vertical layout
    if (this._isHorizontal()) {
      return (
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
          <AnimatedFlatList
            data={HorizonLayouts}
            keyExtractor={(item, index) => `h_${index}`}
            renderItem={this._renderHorizontalList}
            ListHeaderComponent={this._renderHeader}
            scrollEventThrottle={1}
            refreshing={layoutFetching}
            refreshControl={
              <RefreshControl
                refreshing={layoutFetching}
                onRefresh={this._fetchAll}
              />
            }
            {...{ onScroll }}
          />
        </View>
      );
    } else {
      return this._renderVerticalList();
    }

    
  }
}

const styles = {
  section: {
    flex: 1,
    marginBottom: 10,
  },
  header: {
    paddingVertical: 10,
    marginBottom: 10,
    marginLeft: Styles.spaceLayout,
  },
  headerDate: {
    fontSize: 19,
    marginBottom: 10,
    fontFamily: Constants.fontFamily,
  },
  headerStore: (theme) => ({
    color: "#141414",
    fontSize: 30,
    marginBottom: 10,
    fontFamily: Constants.fontFamily,
  }),
};
