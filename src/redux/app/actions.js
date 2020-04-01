/**
 * created by Inspire UI (dang@inspireui.com)
 * @format
 */

import * as types from "./types";

/**
 * initial app
 */
export const beginInitApp = (params) => ({
  type: types.INITIAL_APP,
  payload: params,
});

/**
 * intro screen
 */
export const finishIntro = () => ({
  type: types.FINISH_INTRO,
});

/**
 * notification
 */
export const enableNotification = () => ({
  type: types.NOTIFICATION_ENABLE,
});

export const disableNotification = () => ({
  type: types.NOTIFICATION_DISABLE,
});

export const toggleNotification = (value) => ({
  type: types.NOTIFICATION_TOGGLE,
  payload: {
    value,
  },
});

/**
 * currency
 */
export const changeCurrency = (value) => ({
  type: types.CURRENCY_CHANGE,
  payload: {
    value,
  },
});

/**
 * language
 */
export const changeLanguage = (value) => ({
  type: types.LANGUAGE_CHANGE,
  payload: {
    value,
  },
});

export const changeRtl = (value) => ({
  type: types.LANGUAGE_CHANGE,
  payload: {
    value,
  },
});

/**
 * sidemenu
 */

export const openSidemenu = () => ({
  type: types.SIDEMENU_OPEN,
});

export const closeSidemenu = () => ({
  type: types.SIDEMENU_CLOSE,
});

export const toggleSidemenu = (isOpen) => ({
  type: types.SIDEMENU_TOGGLE,
  payload: {
    isOpen,
  },
});

/**
 * netinfo
 */
export const updateConnectionStatus = (netInfoConnected) => ({
  type: types.UPDATE_CONNECTION_STATUS,
  payload: {
    netInfoConnected,
  },
});

/**
 * toast
 */
export const addToast = (msg, key) => ({
  type: types.ADD_TOAST,
  payload: {
    msg,
    key,
  },
});

export const removeToast = (key) => ({
  type: types.REMOVE_TOAST,
  payload: {
    key,
  },
});

/**
 * shop id
 */
export const changeStoreConfig = (shopConfig) => ({
  type: types.CHANGE_STORE_CONFIG,
  payload: shopConfig,
});

export const resetStore = () => ({
  type: "RESET",
});
