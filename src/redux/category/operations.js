/** @format */

import { GraphqlAPI } from "@services";
import * as actions from "./actions";

/**
 *  @function fetchCategories
 *
 * @param {*} { }
 */
export const fetchCategories = () => (dispatch) => {
  try {
    dispatch(actions.categoryPending());
    GraphqlAPI.getCollections()
      .then((json) => {
        if (json.error) {
          dispatch(actions.categoryFailure(json.error));
        } else {
          const { collections } = json;
          dispatch(actions.categorySuccess(collections));
        }
      })
      .catch((error) => {
        dispatch(actions.categoryFailure(error));
      });
  } catch (error) {
    dispatch(actions.categoryFailure(error));
  }
};
