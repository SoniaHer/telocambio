/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { GraphqlAPI } from "@services";
import { cleanCart } from "@redux/actions";
import * as actions from "./actions";
import { isExpired } from "./utils";

/**
 * login to get accessToken --> get user info
 */
export const login = ({ email, password }) => (dispatch) => {
  try {
    dispatch(actions.loginPending());
    return GraphqlAPI.createCustomerAccessToken({ email, password })
      .then((json) => {
        if (json.error) {
          dispatch(actions.loginFailure(json.error));
        } else {
          const { data } = json;
          dispatch(actions.loginSuccess(data.customerAccessToken));
          // get user info
          dispatch(
            getUserInfo({
              accessToken: data.customerAccessToken.accessToken,
              expiresAt: data.customerAccessToken.expiresAt,
            })
          );
          return data;
        }
      })
      .catch((error) => {
        dispatch(actions.loginFailure(error));
      });
  } catch (error) {
    dispatch(actions.loginFailure(error));
  }
};

export const register = ({ firstName, lastName, email, password }) => (
  dispatch
) => {
  try {
    dispatch(actions.registerPending());
    return GraphqlAPI.createCustomer({
      firstName,
      lastName,
      email,
      password,
    })
      .then((json) => {
        if (json.error) {
          dispatch(actions.registerFailure(json.error));
        } else {
          const { data } = json;
          dispatch(actions.registerSuccess(data));
          return data;
        }
      })
      .catch((error) => {
        dispatch(actions.registerFailure(error));
      });
  } catch (error) {
    dispatch(actions.registerFailure(error));
  }
};

/**
 * @function renewAccessToken renew accessToken when expired
 * @param {*} { accessToken }
 */
export const renewAccessToken = ({ accessToken }) => (dispatch) => {
  try {
    GraphqlAPI.renewCustomerAccessToken({ accessToken })
      .then((json) => {
        if (json.error) {
          dispatch(actions.userInfoFailure(json.error));
        } else {
          const { customerAccessToken } = json;
          dispatch(actions.loginSuccess(customerAccessToken));
          getUserInfo({
            accessToken: customerAccessToken.accessToken,
            expiresAt: customerAccessToken.expiresAt,
          });
        }
      })
      .catch((error) => {
        dispatch(actions.userInfoFailure(error));
      });
  } catch (error) {
    dispatch(actions.userInfoFailure(error));
  }
};

/**
 * get user info
 * @param {{}} { accessToken, expiresAt }
 */
export const getUserInfo = ({ accessToken, expiresAt }) => (dispatch) => {
  try {
    console.log("expire", isExpired(expiresAt));
    if (isExpired(expiresAt)) {
      dispatch(renewAccessToken({ accessToken }));
    } else {
      dispatch(actions.userInfoPending());
      GraphqlAPI.getCustomerInfo({ accessToken })
        .then((json) => {
          if (json.error) {
            dispatch(actions.userInfoFailure(json.error));
          } else {
            const { user } = json;
            dispatch(actions.userInfoSuccess(user));
          }
        })
        .catch((error) => {
          dispatch(actions.userInfoFailure(error));
        });
    }
  } catch (error) {
    dispatch(actions.userInfoFailure(error));
  }
};
/**
 * @function createUserAddress
 *
 * @param {*} { accessToken, address }
 */
export const createUserAddress = ({ accessToken, address }) => (dispatch) => {
  try {
    dispatch(actions.createUserAddressPending());
    return GraphqlAPI.customerCreateAddress({ accessToken, address })
      .then((json) => {
        if (json.error) {
          dispatch(actions.createUserAddressFailure(json.error));
        } else {
          const { data } = json;
          dispatch(actions.createUserAddressSuccess(data.customerAddress));
          return data;
        }
      })
      .catch((error) => {
        dispatch(actions.createUserAddressFailure(error));
      });
  } catch (error) {
    dispatch(actions.createUserAddressFailure(error));
  }
};

/**
 * @function updateUserDefaultAddress
 *
 * @param {} { accessToken, addressId }
 */
export const updateUserDefaultAddress = ({ accessToken, addressId }) => (
  dispatch
) => {
  try {
    dispatch(actions.updateUserDefaultAddressPending());
    return GraphqlAPI.customerUpdateDefaultAddress({ accessToken, addressId })
      .then((json) => {
        if (json.error) {
          dispatch(actions.updateUserDefaultAddressFailure(json.error));
        } else {
          const { data } = json;
          dispatch(actions.updateUserDefaultAddressSuccess(data.customer));
          return data;
        }
      })
      .catch((error) => {
        dispatch(actions.updateUserDefaultAddressFailure(error));
      });
  } catch (error) {
    dispatch(actions.updateUserDefaultAddressFailure(error));
  }
};

/**
 * @function updateUserAddress
 *
 * @param {} { accessToken, addressId, address}
 */
export const updateUserAddress = ({ accessToken, id, address }) => (
  dispatch
) => {
  try {
    dispatch(actions.updateUserAddressPending());
    return GraphqlAPI.customerUpdateAddress({ accessToken, id, address })
      .then((json) => {
        if (json.error) {
          dispatch(actions.updateUserAddressFailure(json.error));
        } else {
          const { data } = json;
          dispatch(actions.updateUserAddressSuccess(data.customerAddress, id));
          return data;
        }
      })
      .catch((error) => {
        dispatch(actions.updateUserAddressFailure(error));
      });
  } catch (error) {
    dispatch(actions.updateUserAddressFailure(error));
  }
};

/**
 * @function deleteUserAddress
 *
 * @param {} { accessToken, addressId, address}
 */
export const deleteUserAddress = ({ accessToken, id }) => (dispatch) => {
  try {
    dispatch(actions.deleteUserAddressPending());
    GraphqlAPI.customerDeleteAddress({ accessToken, id })
      .then((json) => {
        if (json.error) {
          dispatch(actions.deleteUserAddressFailure(json.error));
        } else {
          // const { data } = json;
          dispatch(actions.deleteUserAddressSuccess(id));
        }
      })
      .catch((error) => {
        dispatch(actions.deleteUserAddressFailure(error));
      });
  } catch (error) {
    dispatch(actions.deleteUserAddressFailure(error));
  }
};

/**
 * @function logoutUser logout flow
 */
export const logoutUserAndCleanCart = () => (dispatch) => {
  dispatch(actions.logoutUser());
  dispatch(cleanCart());
};
