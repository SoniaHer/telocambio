/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { GraphqlAPI } from "@services";
import { HorizonLayouts, Languages } from "@common";
import * as actions from "./actions";

const PER_PAGE = 10;
/**
 * fetch all product based on Config Horizontal
 * horizontal mode layout
 */
export const fetchAllProductsLayout = () => (dispatch) => {
  dispatch(actions.layoutAllPending());
  let promises = [];
  HorizonLayouts.map((layout, index) => {
    // fetch articles
    if (!layout.categoryId && layout.type === "article") {
      return promises.push(dispatch(fetchArticlessLayout({ index })));
    }
    return promises.push(dispatch(
      fetchProductsLayout({
        categoryId: layout.categoryId,
        tagId: layout.tag,
        index,
      })
    ))
  });
  Promise.all(promises).then(() => {
    dispatch(actions.layoutAllSuccess());
  });
};

export const fetchProductsLayout = ({ categoryId = "", index }) => (
  dispatch
) => {
  return GraphqlAPI.getProductsByCollection({
    categoryId,
  })
    .then((json) => {
      if (!json) {
        dispatch(actions.fetchProductsLayoutFailure(Languages.getDataError));
      } else if (json.code) {
        dispatch(actions.fetchProductsLayoutFailure(json.message));
      } else {
        dispatch(
          actions.fetchProductsLayoutSuccess(json, { index, id: categoryId })
        );
      }
    })
    .catch((error) => {
      dispatch(actions.fetchProductsLayoutFailure(error));
    });
};

/**
 * load more
 */
export const fetchProductLayoutNextPage = ({ cursor, index, categoryId }) => (
  dispatch
) => {
  dispatch(actions.loadMorePending({ index, id: categoryId }));
  return GraphqlAPI.getProductsByCollection({
    pageSize: PER_PAGE,
    cursor,
    categoryId,
  })
    .then((json) => {
      if (!json) {
        dispatch(actions.loadMoreFailure(Languages.getDataError));
      } else if (json.code) {
        dispatch(actions.loadMoreFailure(json.message));
      } else {
        dispatch(actions.loadMoreSuccess(json, { index, id: categoryId }));
      }
    })
    .catch((error) => {
      console.warn(error);
      dispatch(actions.loadMoreFailure(error));
    });
};

/**
 * @function fetchArticlessLayout
 */
export const fetchArticlessLayout = ({ index, cursor }) => (dispatch) => {
  return GraphqlAPI.getArticles({ cursor })
    .then((json) => {
      if (!json) {
        dispatch(actions.fetchProductsLayoutFailure(Languages.getDataError));
      } else if (json.code) {
        dispatch(actions.fetchProductsLayoutFailure(json.message));
      } else {
        dispatch(actions.fetchProductsLayoutSuccess(json, { index }));
      }
    })
    .catch((error) => {
      dispatch(actions.fetchProductsLayoutFailure(error));
    });
};

/**
 * @function fetchArticlessLayoutNextPage
 */
export const fetchArticlessLayoutNextPage = ({ index, cursor }) => (
  dispatch
) => {
  return GraphqlAPI.getArticles({ cursor })
    .then((json) => {
      if (!json) {
        dispatch(actions.loadMoreFailure(Languages.getDataError));
      } else if (json.code) {
        dispatch(actions.loadMoreFailure(json.message));
      } else {
        dispatch(actions.loadMoreSuccess(json, { index }));
      }
    })
    .catch((error) => {
      dispatch(actions.loadMoreFailure(error));
    });
};
