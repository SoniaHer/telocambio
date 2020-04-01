/** @format */

import React from "react";
import { Animated } from "react-native";
import { isEmpty } from "lodash";
import { Config, Styles } from "@common";

const NavBarLogo = (props) => {
  const scrollAnimation =
    props && !isEmpty(props.navigation)
      ? props.navigation.getParam("animatedHeader")
      : new Animated.Value(1);

  return (
    <Animated.Image
      source={Config.LogoImage}
      style={[Styles.Common.logo, { opacity: scrollAnimation }]}
    />
  );
};

export default NavBarLogo;
