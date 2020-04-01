/** @format */

import React, { PureComponent } from "react";
import { Languages, Color, Styles } from "@common";
import { WishListContainer } from "@containers";
import { NavBarTitle, NavBarBack } from "@components";

export default class WishListScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: NavBarTitle({ title: Languages.WishList }),
    headerLeft: NavBarBack({ navigation }),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
  });

  render() {
    return <WishListContainer {...this.props} />;
  }
}
