/** @format */

import React, { Component } from "react";
import { Color, Styles } from "@common";
import { MyOrdersContainer } from "@containers";
import { NavBarMenu, NavBarLogo } from "@components";

export default class MyOrdersScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: NavBarLogo({ navigation }),
    headerLeft: NavBarMenu({ navigation }),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
  });

  render() {
    return <MyOrdersContainer {...this.props} />;
  }
}
