/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { GraphqlAPI } from "@services";
import { Languages } from "@common";
import { cleanCart } from "@redux/actions";
import * as actions from "./actions";
import { checkCardExisted, formatCreditCard } from "./utils";

/**
 * @function getPaymentSettings get payment setting
 */
export const getPaymentSettings = () => (dispatch) => {
  try {
    dispatch(actions.paymentSettingPending());
    GraphqlAPI.getPaymentSettings()
      .then((json) => {
        if (json.error) {
          dispatch(actions.paymentSettingFailure(json.error));
        } else {
          const { data } = json;
          dispatch(actions.paymentSettingSuccess(data));
        }
      })
      .catch((error) => {
        dispatch(actions.paymentSettingFailure(error));
      });
  } catch (error) {
    dispatch(actions.paymentSettingFailure(error));
  }
};

/**
 * @function addCreditCard add credit card with webservice
 * @param {Object} params {cardVaultUrl, creditCard}
 */
export const addCreditCard = (params) => (dispatch) => {
  try {
    dispatch(actions.addCreditCardPending());
    return GraphqlAPI.addCreditCard(params)
      .then((json) => {
        if (json.error) {
          dispatch(actions.addCreditCardFailure(json.error));
        } else {
          const { data } = json;
          const isExisted = checkCardExisted(
            params.payments,
            params.creditCard
          );
          if (isExisted) {
            dispatch(actions.addCreditCardFailure(Languages.Error));
          } else {
            const creditCard = formatCreditCard(data.id, params.creditCard);
            dispatch(actions.addCreditCardSuccess(creditCard));
            return data;
          }
        }
      })
      .catch((error) => {
        dispatch(actions.addCreditCardFailure(error));
      });
  } catch (error) {
    dispatch(actions.addCreditCardFailure(error));
  }
};

/**
 * @function checkoutWithCreditcard
 */
export const checkoutWithCreditcard = ({ checkoutId, payment }) => (
  dispatch
) => {
  try {
    dispatch(actions.completeCreditCardPending());
    GraphqlAPI.checkoutWithCreditCard({ checkoutId, payment })
      .then((json) => {
        if (json.error) {
          dispatch(actions.completeCreditCardFailure(json.error));
        } else {
          const { data } = json;
          dispatch(actions.completeCreditCardSuccess(data));
          /**
           * clean cart when complete payment
           */
          // dispatch(cleanCart());
        }
      })
      .catch((error) => {
        dispatch(actions.completeCreditCardFailure(error));
      });
  } catch (error) {
    dispatch(actions.completeCreditCardFailure(error));
  }
};

/**
 * @function checkoutFree
 */
export const checkoutFree = ({ checkoutId }) => (dispatch) => {
  try {
    dispatch(actions.completeFreePending());
    GraphqlAPI.checkoutFree({ checkoutId })
      .then((json) => {
        if (json.error) {
          dispatch(actions.completeFreeFailure(json.error));
        } else {
          const { data } = json;
          dispatch(actions.completeFreeSuccess(data));
          /**
           * clean cart when completeFree
           * */
          dispatch(cleanCart());
        }
      })
      .catch((error) => {
        dispatch(actions.completeFreeFailure(error));
      });
  } catch (error) {
    dispatch(actions.completeFreeFailure(error));
  }
};
