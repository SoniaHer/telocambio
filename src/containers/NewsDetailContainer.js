/** @format */

import React, { PureComponent } from "react";
import { Text, Animated, Platform, View, I18nManager } from "react-native";
import { connect } from "react-redux";
import TimeAgo from "react-native-timeago";
import { Constants, Tools, Styles } from "@common";
import { WebView } from "@components";

const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 42 : 42;
const HEADER_SCROLL_DISTANCE = Styles.headerHeight - HEADER_MIN_HEIGHT;

const mapStateToProps = (state, props) => {
  const post = props.navigation.getParam("item");
  return {
    post,
  };
};

@connect(mapStateToProps)
export default class NewsDetailContainer extends PureComponent {
  state = { scrollY: new Animated.Value(0) };

  updateScroll = () => {
    this._scrollView._component.scrollTo({ x: 0, y: 0, animated: true });
  };

  _renderContent = () => {
    const { title, content, publishedAt, author } = this.props.post;
    const postContent = Tools.getDescription(content, "100000000");

    return (
      <View style={styles.scrollViewContent}>
        <Text style={styles.detailDesc}>{title}</Text>
        <Text style={styles.author}>
          <Text>{author.name}</Text> - <TimeAgo time={publishedAt} hideAgo />
          ago
        </Text>
        <WebView html={postContent} />
      </View>
    );
  };

  _renderBanner = () => {
    const { image } = this.props.post;
    const imageURL = Tools.getProductImage(
      image ? image.src : null,
      Styles.width
    );

    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE - HEADER_MIN_HEIGHT],
      extrapolate: "clamp",
    });
    const animateOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslate }] },
        ]}>
        <Animated.Image
          source={{ uri: imageURL }}
          style={[
            styles.imageBackGround,
            {
              opacity: animateOpacity,
              transform: [{ translateY: imageTranslate }],
            },
          ]}
        />
      </Animated.View>
    );
  };

  render() {
    return (
      <View style={styles.body}>
        {this._renderBanner()}

        <Animated.ScrollView
          ref={(comp) => (this._scrollView = comp)}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}>
          {this._renderContent()}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = {
  body: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollViewContent: {
    marginTop: Styles.headerHeight,
    position: "relative",
    marginBottom: 100,
  },
  detailDesc: {
    color: "#333",
    width: Styles.window.width,
    marginTop: 16,
    marginRight: 16,
    marginBottom: 2,
    marginLeft: 13,
    fontWeight: "500",
    fontSize: 22,
    textAlign: I18nManager.isRTL ? "right" : "left",
    fontFamily: Constants.fontFamilyBold,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    overflow: "hidden",
    height: Styles.headerHeight,
  },
  imageBackGround: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: Styles.window.width,
    height: Styles.headerHeight,
  },
  author: {
    color: "#999",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 12,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
    textAlign: I18nManager.isRTL ? "right" : "left",
    fontFamily: Constants.fontFamily,
  },
};
