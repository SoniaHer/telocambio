/**
 * Created by InspireUI on 27/02/2017.
 *
 * @format
 */

import React, { PureComponent } from "react";
import { View, Animated } from "react-native";
import { connect } from "react-redux";

import {
  fetchProductsByCategoryId,
  fetchProductsByCategoryIdNextPage,
} from "@redux/operations";
import { cleanProducts } from "@redux/actions";
import { toast } from "@app/Omni";
import { Empty, VerticalList, Spinkit } from "@components";
import ProductRow from "./ProductRow";
import ControlBar from "./ControlBar";
import styles from "./styles";

const mapStateToProps = (state) => {
  const selectedCategory = state.category.selectedCategory;
  return {
    list: state.products.list,
    hasNextPage: state.products.hasNextPage,
    cursor: state.products.cursor,
    isFetching: state.products.isFetching,
    error: state.products.error,

    selectedCategory,

    netInfo: state.netInfo,
  };
};

@connect(
  mapStateToProps,
  {
    fetchProductsByCategoryId,
    fetchProductsByCategoryIdNextPage,
    cleanProducts,
  }
)
export default class CategoryContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      displayControlBar: true,
    };
  }

  componentWillMount() {
    this.props.cleanProducts();
  }

  componentDidMount() {
    this._fetchAll();
  }

  componentWillReceiveProps(nextProps) {
    const props = this.props;
    const { error } = nextProps;
    if (error) toast(error);

    if (props.selectedCategory !== nextProps.selectedCategory) {
      this._fetchAll(nextProps.selectedCategory);
    }
  }

  _fetchAll = (newSelectedCategory) => {
    const { selectedCategory } = this.props;
    this.props.fetchProductsByCategoryId({
      categoryId: newSelectedCategory
        ? newSelectedCategory.id
        : selectedCategory.id,
    });
  };

  _loadMore = () => {
    const { hasNextPage, cursor, selectedCategory } = this.props;
    if (hasNextPage && cursor) {
      this.props.fetchProductsByCategoryIdNextPage({
        cursor,
        categoryId: selectedCategory.id,
      });
    }
  };

  _renderContent = () => {
    const { list, isFetching, name, hasNextPage } = this.props;

    return (
      <VerticalList
        list={list}
        isFetching={isFetching}
        onLoadMore={this._loadMore}
        onRefetch={this._fetchAll}
        name={name}
        hasNextPage={hasNextPage}
        renderRow={this._renderRow}
      />
    );
  };

  _renderRow = (item) => {
    const onPress = () => this._onPressItem(item);
    return <ProductRow product={item} onPress={onPress} />;
  };

  _onPressItem = (item) => {
    this.props.navigation.navigate("Detail", { item });
  };

  render() {
    const { displayControlBar } = this.state;
    const { error, selectedCategory, isFetching, list } = this.props;

    if (!selectedCategory) return null;

    if (error) {
      return <Empty text={error} />;
    }

    if (isFetching && list && list.length === 0) {
      return (
        <Spinkit
          style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}
        />
      );
    }

    const marginControlBar = this.state.scrollY.interpolate({
      inputRange: [-100, 0, 40, 50],
      outputRange: [0, 0, -50, -50],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{ marginTop: marginControlBar }}>
          <ControlBar
            isVisible={displayControlBar}
            name={selectedCategory.name}
          />
        </Animated.View>

        {this._renderContent()}
      </View>
    );
  }
}
