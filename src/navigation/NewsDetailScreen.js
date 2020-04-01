/** @format */

import React, { Component } from "react";

import { Color, Styles } from "@common";
import { NewsDetailContainer } from "@containers";
import { NavBarClose, NavBarLogo } from "@components";

export default class NewsDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: NavBarLogo({ navigation }),
    headerLeft: NavBarClose({ navigation }),
    tabBarVisible: false,

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <NewsDetailContainer {...this.props} />;
  }
}
