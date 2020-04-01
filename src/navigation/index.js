/** @format */

import React from "react";
import { Images } from "@common";
import { TabBar } from "@components";
import { View, I18nManager, StyleSheet, Animated } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
} from "react-navigation";
import { TabViewPagerPan } from "react-native-tab-view";
import { TabBarIconContainer } from "@containers";
import HomeScreen from "./HomeScreen";
import NewsDetailScreen from "./NewsDetailScreen";
import CategoriesScreen from "./CategoriesScreen";
import CategoryScreen from "./CategoryScreen";
import ProductDetailScreen from "./ProductDetailScreen";
import CartScreen from "./CartScreen";
import MyOrdersScreen from "./MyOrdersScreen";
import WishlistScreen from "./WishListScreen";
import SearchScreen from "./SearchScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import CustomPageScreen from "./CustomPageScreen";
import ListAllScreen from "./ListAllScreen";
// import SettingScreen from "./SettingScreen";
import UserProfileScreen from "./UserProfileScreen";
import UserAddressScreen from "./UserAddressScreen";
import UserAddressFormScreen from "./UserAddressFormScreen";
// import AddCreditCardScreen from "./AddCreditCardScreen";

import TransitionConfig from "./TransitionConfig";

const CategoryStack = createStackNavigator(
  {
    CategoriesScreen: { screen: CategoriesScreen },
    CategoryScreen: { screen: CategoryScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const CategoryDetailStack = createStackNavigator(
  {
    CategoryScreen: { screen: CategoryScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

// const WishlistStack = createStackNavigator(
//   {
//     WishlistScreen: { screen: WishlistScreen },
//   },
//   {
//     navigationOptions: {
//       gestureDirection: I18nManager.isRTL ? "inverted" : "default",
//     },
//   }
// );

const SearchStack = createStackNavigator(
  {
    Search: { screen: SearchScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    ListAllScreen: { screen: ListAllScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const CartScreenStack = createStackNavigator(
  {
    Cart: { screen: CartScreen },
    UserAddressScreen: { screen: UserAddressScreen },
    UserAddressFormScreen: { screen: UserAddressFormScreen },
    // AddCreditCardScreen: { screen: AddCreditCardScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const UserProfileStack = createStackNavigator(
  {
    UserProfile: { screen: UserProfileScreen },
    WishlistScreen: { screen: WishlistScreen },
    UserAddressScreen: { screen: UserAddressScreen },
    UserAddressFormScreen: { screen: UserAddressFormScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const MyOrdersStack = createStackNavigator(
  {
    MyOrders: { screen: MyOrdersScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Default: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer icon={Images.IconHome} {...props} />
        ),
      },
    },
    CategoriesScreen: {
      screen: CategoryStack,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer
            css={{ width: 18, height: 18 }}
            icon={Images.IconCategory}
            {...props}
          />
        ),
      },
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer
            css={{ width: 18, height: 18 }}
            icon={Images.IconSearch}
            {...props}
          />
        ),
      },
    },
    CartScreen: {
      screen: CartScreenStack,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer
            cartIcon
            css={{ width: 20, height: 20 }}
            icon={Images.IconCart}
            {...props}
          />
        ),
        tabBarVisible: false,
      },
    },
    MyOrdersScreen: {
      screen: MyOrdersStack,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer
            orderIcon
            css={{ width: 18, height: 18 }}
            icon={Images.IconOrder}
            {...props}
          />
        ),
      },
    },
    UserProfileScreen: {
      screen: UserProfileStack,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer
            wishlistIcon
            css={{ width: 18, height: 18 }}
            icon={Images.IconUser}
            {...props}
          />
        ),
      },
    },
    // SettingScreen: { screen: SettingScreen },

    CategoryDetail: { screen: CategoryDetailStack },
  },
  {
    // initialRouteName: "CartScreen",
    tabBarComponent: TabBar,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
    },
    lazy: true,
  }
);

TabNavigator.navigationOptions = () => {
  return {
    // fix header show when open drawer
    header: <View />,
    headerStyle: {
      backgroundColor: "transparent",
      height: 0,
      paddingTop: 0,
      borderBottomColor: "transparent",
      borderBottomWidth: 0,
    },
    gestureDirection: I18nManager.isRTL ? "inverted" : "default",
  };
};

const AppNavigator = createStackNavigator(
  {
    Tab: TabNavigator,
    Detail: ProductDetailScreen,
    News: NewsDetailScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    CustomPage: CustomPageScreen,
  },
  {
    mode: "modal",
    transitionConfig: () => TransitionConfig,
  }
);

export default createAppContainer(AppNavigator);

/**
 * prevent duplicate screen
 */
const navigateOnce = (getStateForAction) => (action, state) => {
  const { type, routeName } = action;
  return state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
    ? null
    : getStateForAction(action, state);
};


CategoryStack.router.getStateForAction = navigateOnce(
  CategoryStack.router.getStateForAction
);
CategoryDetailStack.router.getStateForAction = navigateOnce(
  CategoryDetailStack.router.getStateForAction
);
// WishlistStack.router.getStateForAction = navigateOnce(
//   WishlistStack.router.getStateForAction
// );
HomeStack.router.getStateForAction = navigateOnce(
  HomeStack.router.getStateForAction
);
SearchStack.router.getStateForAction = navigateOnce(
  SearchStack.router.getStateForAction
);
CartScreenStack.router.getStateForAction = navigateOnce(
  CartScreenStack.router.getStateForAction
);
