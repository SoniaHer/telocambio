/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { Constants, AppConfig, Color } from "@common";
import * as types from "./types";

const initialState = {
  finishIntro: false,
  enableNotification: false,
  currency: {
    symbol: "$",
    name: "US Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "USD",
    name_plural: "US dollars",
  },
  language: {
    lang: Constants.Language,
    rtl: Constants.RTL,
  },
  isOpenSidemenu: false,
  netInfoConnected: true,
  toast: {
    list: [],
  },
  shopify: {
    ...AppConfig.Shopify,
    appName: Constants.nameStore,
    primaryColor: Color.primary,
  },
  isNewStore: false,
};

export default (state = initialState, action) => {
  const { type, payload, error, meta } = action;

  switch (type) {
    case types.INITIAL_APP: {
      return {
        ...state,
        shopify: {
          ...state.shopify,
          ...payload,
        },
        isNewStore: false,
      };
    }

    case types.FINISH_INTRO: {
      return {
        ...state,
        finishIntro: true,
      };
    }

    case types.NOTIFICATION_ENABLE: {
      return {
        ...state,
        enableNotification: true,
      };
    }

    case types.NOTIFICATION_DISABLE: {
      return {
        ...state,
        enableNotification: false,
      };
    }

    case types.NOTIFICATION_TOGGLE: {
      return {
        ...state,
        enableNotification: payload.value,
      };
    }

    case types.CURRENCY_CHANGE: {
      return {
        ...state,
        currency: {
          ...payload.value,
        },
      };
    }

    case types.LANGUAGE_CHANGE: {
      return {
        ...state,
        language: {
          ...payload.value,
        },
      };
    }

    case types.RTL_CHANGE: {
      return {
        ...state,
        language: {
          ...payload.value,
        },
      };
    }

    /**
     * sidemenu
     */
    case types.SIDEMENU_OPEN: {
      return {
        ...state,
        isOpenSidemenu: true,
      };
    }

    case types.SIDEMENU_CLOSE: {
      return {
        ...state,
        isOpenSidemenu: false,
      };
    }

    case types.SIDEMENU_TOGGLE: {
      if (!payload || (payload && typeof payload.isOpen === "undefined")) {
        return {
          ...state,
          isOpenSidemenu: !state.isOpenSidemenu,
        };
      }
      return {
        ...state,
        isOpenSidemenu: payload.isOpen,
      };
    }

    case types.UPDATE_CONNECTION_STATUS: {
      return {
        ...state,
        netInfoConnected: payload.netInfoConnected,
      };
    }

    case types.ADD_TOAST: {
      return {
        ...state,
        toast: {
          list: state.toast.list.some((toast) => toast.msg === payload.msg)
            ? state.toast.list
            : [payload, ...state.toast.list],
        },
      };
    }
    case types.REMOVE_TOAST: {
      return {
        ...state,
        toast: {
          list: state.toast.list.filter((msg) => msg.key !== payload.key),
        },
      };
    }

    case types.CHANGE_STORE_CONFIG: {
      return {
        ...state,
        shopify: payload,
        isNewStore: true,
      };
    }

    default:
      return state;
  }
};
