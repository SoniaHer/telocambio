/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import GraphqlAPI from "@services/GraphqlAPI";
import { Languages } from "@common";
import * as actions from "./actions";

const PER_PAGE = 10;
/**
 * fetch all product
 */
export const fetchAllProducts = (pageSize = PER_PAGE) => (dispatch) => {
  dispatch(actions.productAllPending());

  GraphqlAPI.getProducts({ pageSize })
    .then((json) => {
      dispatch(actions.productAllSuccess(json));
    })
    .catch((error) => {
      dispatch(actions.productAllFailure(error));
    });
};

/**
 * fetch more all product
 */
export const fetchMoreAllProducts = ({ cursor }) => (dispatch) => {
  if (!cursor) return;
  dispatch(actions.productAllMorePending());
  return GraphqlAPI.getProducts({ cursor, pageSize: PER_PAGE })
    .then((json) => {
      if (!json) {
        dispatch(actions.productAllMoreFailure(Languages.getDataError));
      } else if (json.code) {
        dispatch(actions.productAllMoreFailure(json.message));
      } else {
        dispatch(actions.productAllMoreSuccess(json));
      }
    })
    .catch((error) => {
      dispatch(actions.productAllMoreFailure(error));
    });
};

/**
 * @function fetchProductsByCategoryId
 * get product by collection id
 * @param {*} { categoryId }
 */
export const fetchProductsByCategoryId = ({ categoryId }) => (dispatch) => {
  dispatch(actions.productPending());
  return GraphqlAPI.getProductsByCollection({ categoryId })
    .then((json) => {
      if (!json) {
        dispatch(actions.productFailure(Languages.getDataError));
      } else if (json.code) {
        dispatch(actions.productFailure(json.message));
      } else {
        dispatch(actions.productSuccess(json));
      }
    })
    .catch((error) => {
      dispatch(actions.productFailure(error));
    });
};

/**
 * @function fetchProductsByCategoryIdNextPage
 * get more product by collection id
 * @param {*} { cursor, categoryId }
 */
export const fetchProductsByCategoryIdNextPage = ({ cursor, categoryId }) => (
  dispatch
) => {
  if (!cursor) return;
  dispatch(actions.productMorePending());
  return GraphqlAPI.getProductsByCollection({ cursor, categoryId })
    .then((json) => {
      if (!json) {
        dispatch(actions.productMoreFailure(Languages.getDataError));
      } else if (json.code) {
        dispatch(actions.productMoreFailure(json.message));
      } else {
        dispatch(actions.productMoreSuccess(json));
      }
    })
    .catch((error) => {
      dispatch(actions.productMoreFailure(error));
    });
};

/**
 * @function fetchRelatedProduct fetch related products
 * do not use redux to store, only use function to sync another services
 */
export const fetchRelatedProduct = ({ query }) => {
  try {
    return GraphqlAPI.getRelatedProductsByCollection({ query }).then((data) => {
      return data;
    });
  } catch (error) {
    console.warn(error);
  }
};

/**
 * @function fetchProductByName search product
 * do not use redux to store, only use function to sync another services
 */
export const fetchProductByName = ({ query, cursor }) => {
  try {
    return GraphqlAPI.getProductsByName({ query, cursor }).then((data) => {
      return data;
    });
  } catch (error) {
    console.warn(error);
  }
};
