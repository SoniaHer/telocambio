/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import store from "@store/configureStore";
import {
  getUserInfo,
  checkCheckout,
  getPaymentSettings,
} from "@redux/operations";
import { Config } from "@common";
import { cleanCart } from "@redux/actions";
import { SpotAPI } from "@services";
import * as actions from "./actions";

/**
 * initial app
 */
export const initialApp = (params) => (dispatch) => {
  console.log(params);
  dispatch(actions.beginInitApp(params));

  const state = store.getState();
  const { carts, user } = state;
  const { accessToken, expiresAt } = user;

  if (accessToken) {
    dispatch(getUserInfo({ accessToken, expiresAt }));
  }
  if (carts.checkoutId) {
    if (carts.cartItems && carts.cartItems.length === 0) {
      dispatch(cleanCart());
    } else {
      dispatch(checkCheckout({ checkoutId: carts.checkoutId }));
    }
  }
  dispatch(getPaymentSettings());
};

export const handleChangeStore = (id) => (dispatch) => {
  try {
    return SpotAPI.getProductShopifyInfo(id)
      .then((config) => {
        if (config.message) {
          return null;
        }
        dispatch(
          actions.changeStoreConfig({
            url: `https://${config.url}`,
            graphqlUrl: `https://${config.url}/api/graphql`,
            storeAccessToken: config.store_front_key,
            appName: config.app_name,
            primaryColor: config.primary_color,
            shopId: config.shopId,
            fullName: config.full_name,
          })
        );

        // dispatch(actions.resetStore());

        return config;
      })
      .catch((error) => {
        console.warn(error);
      });
  } catch (error) {
    console.warn(error);
  }
};
