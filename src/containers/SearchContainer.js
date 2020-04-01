/** @format */

import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import { EventEmitter } from "fbemitter";
import { debounce } from "lodash";
import { fetchProductByName } from "@redux/operations";
import { Languages, Constants } from "@common";
import { ProductItemContainer } from "@containers";
import { Spinkit, VerticalList, SearchBar } from "@components";

/**
 * TODO: load more
 * do not use redux --> will leak performance when search
 */
export default class SearchContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cursor: null,
      hasNextPage: false,
      isFetching: false,
      list: [],
      emitter: new EventEmitter(),
      text: "",
      recommendList: [],
    };
  }

  componentDidMount() {
    this._searchSubscription = this.state.emitter.addListener(
      "change",
      debounce(this._handleSearch, 16.6 * 2)
    );
    fetchProductByName({ query: "" }).then((data) => {
      this.setState({ recommendList: data.list });
    });
  }

  componentWillUnmount() {
    this._searchSubscription && this._searchSubscription.remove();
  }

  _renderLoading = () => {
    return this.state.isFetching;
  };

  _handleChangeText = (text) => {
    this.state.emitter && this.state.emitter.emit("change", text);

    this.setState({ text });
  };

  _handleSearch = (text) => {
    if (text.length > 1) {
      this.setState({ isFetching: true });

      fetchProductByName({ query: text }).then((data) => {
        this.setState({ isFetching: false, ...data });
      });
    }
  };

  _loadMore = () => {
    const { cursor, hasNextPage, text } = this.state;

    if (cursor && hasNextPage) {
      fetchProductByName({ cursor, query: text }).then((data) => {
        const list = [...this.state.list, ...data.list];
        this.setState({ ...data, list });
      });
    }
  };

  _onPressItem = (item) => {
    this.props.navigation.navigate("DetailScreen", { item });
  };

  _renderRow = (item) => {
    const onPress = () => this._onPressItem(item);
    return (
      <ProductItemContainer
        onPress={onPress}
        id={item.id}
        product={item}
        showImage
      />
    );
  };

  _renderDefaultSearch = () => {
    return (
      <View style={{ flex: 1 }}>
        <VerticalList
          list={this.state.recommendList}
          renderHeader={() => (
            <Text style={styles.text}>{Languages.RecommendedProduct}</Text>
          )}
          renderRow={this._renderRow}
          numColumns={1}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    );
  };

  _renderResultList = () => {
    const { list, isFetching, hasNextPage, text } = this.state;

    if (list && list.length === 0 && !this._renderLoading()) {
      return this._renderDefaultSearch();
    }
    return (
      <VerticalList
        list={list}
        isFetching={isFetching}
        onLoadMore={this._loadMore}
        hasNextPage={hasNextPage}
        renderRow={this._renderRow}
        numColumns={1}
        contentContainerStyle={styles.contentContainerStyle}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <SearchBar
          text={this.state.text}
          onChangeText={this._handleChangeText}
        />
        <View style={{ flex: 1 }}>
          {this._renderLoading() ? <Spinkit /> : this._renderResultList()}
        </View>
      </View>
    );
  }
}

const styles = {
  contentContainerStyle: {
    marginHorizontal: 30,
    paddingTop: 20,
  },
  text: {
    fontFamily: Constants.fontFamilyBold,
    fontSize: 20,
  },
};
