/** @format */

import React, { Component } from "react";
import { Styles } from "@common";
import { NavBarBack, NavBarTitle } from "@components";
import { ListAllContainer } from "@containers";

/**
 * TODO: refactor
 */

export default class ListAllScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam("name");
    return {
      headerLeft: NavBarBack({ navigation }),
      headerTitle: NavBarTitle({ navigation, title: name }),

      headerStyle: Styles.Common.headerStyle,
      headerTitleStyle: Styles.Common.headerTitleStyle,
    };
  };

  render() {
    return <ListAllContainer {...this.props} />;
  }
}
