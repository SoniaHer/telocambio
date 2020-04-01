/** @format */

import React, { PureComponent } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { withTheme } from "@callstack/react-theme-provider";
import { Updates } from "expo";
import Dialog from "react-native-dialog";
import { connect } from "react-redux";
import { toggleNotification, changeCurrency } from "@redux/actions";
import { logoutUserAndCleanCart, handleChangeStore } from "@redux/operations";
import {
  UserProfileHeader,
  UserProfileRowItem,
  ModalBox,
  CurrencyPicker,
} from "@components";
import { Languages, Tools, Constants } from "@common";

const mapStateToProps = ({ user, wishlist, app }) => ({
  wishlistTotal: wishlist.total,
  userInfo: user.userInfo,

  language: user.language,
  currency: app.currency,
  enableNotification: app.enableNotification,
  shopId: app.shopify.shopId,
});

/**
 * TODO: refactor
 */
@withTheme
@connect(
  mapStateToProps,
  {
    toggleNotification,
    changeCurrency,
    logoutUserAndCleanCart,
    handleChangeStore,
  }
)
export default class UserProfileContainer extends PureComponent {
  state = { dialogVisible: false, shopId: null, isChagingStore: false };
  /**
   * TODO: refactor to config.js file
   */
  _getListItem = () => {
    const {
      currency,
      wishlistTotal,
      userInfo,
      enableNotification,
    } = this.props;

    const listItem = [
      {
        label: `${Languages.WishList} (${wishlistTotal})`,
        routeName: "WishlistScreen",
      },
      userInfo && {
        label: `${Languages.Address} (${userInfo.addresses.length})`,
        routeName: "UserAddressScreen",
      },
      userInfo && {
        label: Languages.MyOrder,
        routeName: "MyOrders",
      },
      // only support mstore pro
      //   {
      //     label: Languages.Languages,
      //     routeName: 'SettingScreen',
      //     value: language.lang,
      //   },
      // {
      //   label: Languages.PushNotification,
      //   icon: () => (
      //     <Switch
      //       onValueChange={this._handleSwitch}
      //       value={enableNotification}
      //       tintColor={Color.blackDivide}
      //     />
      //   ),
      // },
      // {
      //   label: Languages.contactus,
      //   routeName: "CustomPage",
      //   params: {
      //     id: 10941,
      //     title: Languages.contactus,
      //   },
      // },
      // {
      //   label: Languages.Privacy,
      //   routeName: "CustomPage",
      //   params: {
      //     id: 10941,
      //     title: Languages.Privacy,
      //   },
      // },

    ];

    return listItem;
  };

  _handleSwitch = (value) => {
    this.props.toggleNotification(value);
  };

  _handlePress = (item) => {
    const { navigation } = this.props;
    const { routeName, isActionSheet } = item;

    if (routeName && !isActionSheet) {
      navigation.navigate(routeName, item.params);
    }

    if (isActionSheet) {
      this.currencyPicker.openModal();
    }
  };

  _handlePressLogin = () => {
    if (this.props.userInfo) {
      this.props.logoutUserAndCleanCart();
    } else {
      this.props.navigation.navigate("Login");
    }
  };

  _openAlert = () => {
    this.setState({ dialogVisible: true });
  };

  _handleOk = () => {
    if (this.props.shopId == this.state.shopId) {
      // this.setState({ dialogVisible: false });
      alert("Same secret code, please change another code");
    } else {
      this.setState({ isChagingStore: true });
      this.props.handleChangeStore(this.state.shopId).then((data) => {
        if (data) {
          console.log(`You entered ${this.state.shopId}`, data);
          setTimeout(() => {
            Updates.reload();
          }, 500);
        } else {
          this.setState({ isChagingStore: false });
        }
      });
    }
  };

  render() {
    const { userInfo, currency, changeCurrency, theme } = this.props;
    const name = Tools.getName(userInfo);
    const listItem = this._getListItem();

    return (
      <View style={styles.container}>
        <ScrollView>
          <UserProfileHeader
            onPress={this._handlePressLogin}
            user={{
              ...userInfo,
              name,
            }}
          />

          {userInfo && (
            <View style={styles.profileSection}>
              <Text style={styles.headerSection}>
                {Languages.AccountInformations.toUpperCase()}
              </Text>
              <UserProfileRowItem
                label={Languages.Name}
                onPress={this._handlePress}
                value={name}
              />
              <UserProfileRowItem
                label={Languages.Email}
                value={userInfo.email}
              />
            </View>
          )}

          <View style={styles.profileSection}>
            {listItem.map((item, index) => {
              return (
                item && (
                  <UserProfileRowItem
                    icon
                    key={index.toString()}
                    onPress={() => this._handlePress(item)}
                    {...item}
                  />
                )
              );
            })}

          </View>
        </ScrollView>

        <ModalBox ref={(c) => (this.currencyPicker = c)}>
          <CurrencyPicker currency={currency} changeCurrency={changeCurrency} />
        </ModalBox>

        {this.state.isChagingStore ? (
          <Dialog.Container visible={this.state.dialogVisible}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator
                color={"#141414"}
                style={{ marginBottom: 10 }}
              />
              <Text style={{ paddingBottom: 10 }}>Initializing...</Text>
            </View>
          </Dialog.Container>
        ) : (
          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>Enter your secret code</Dialog.Title>

            <Dialog.Input
              autoFocus
              value={this.state.shopId}
              onChangeText={(text) => {
                this.setState({ shopId: text });
              }}
            />
            <Dialog.Button
              label="Cancel"
              onPress={() => {
                this.setState({ dialogVisible: false });
              }}
            />
            <Dialog.Button label="Ok" onPress={this._handleOk} />
          </Dialog.Container>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  profileSection: {
    backgroundColor: "#FFF",
    marginBottom: 15,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 13,
    color: "#4A4A4A",
    fontWeight: "600",
  },
});
