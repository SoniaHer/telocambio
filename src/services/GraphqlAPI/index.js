/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { formatProduct, Category } from "@data";
import { AppConfig } from "@common";
import {
  GET_SHOP,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_NAME,
  GET_COLLECTIONS,
  GET_PRODUCTS_BY_COLLECTION,
  GET_RELATED_PRODUCTS_BY_COLLECTION,
  CREATE_CHECKOUT,
  APPLY_COUPON,
  REMOVE_COUPON,
  ADD_CHECKOUT,
  CHECK_CHECKOUT,
  UPDATE_CHECKOUT,
  REMOVE_CHECKOUT,
  UPDATE_CHECKOUT_SHIPPING_ADDRESS,
  UPDATE_CHECKOUT_SHIPPING_LINE,
  CHECKOUT_LINK_USER,
  CUSTOMER_CREATE,
  CUSTOMER_CREATE_ACCESS_TOKEN,
  CUSTOMER_RENEW_ACCESS_TOKEN,
  CUSTOMER_INFO,
  CUSTOMER_ADDRESS_CREATE,
  CUSTOMER_ADDRESS_UPDATE,
  CUSTOMER_DEFAULT_ADDRESS_UPDATE,
  CUSTOMER_ADDRESS_DELETE,
  GET_PAYMENT_SETTINGS,
  CHECKOUT_WITH_CREDITCARD,
  CHECKOUT_WITH_FREE,
  GET_ORDERS,
  GET_ARTICLES,
} from "./Schema";
import configureClient from "./configureClient";
import {
  getCursor,
  getHasNextPage,
  convertProductModelFromCheckout,
  formatError,
  checkAndFormatData,
} from "./utils";

const PER_PAGE = 10;
const PER_PAGE_SEARCH = 7;

/**
 * TODO: refactor checkAndFormatData
 * TODO: enhancer return each function is "data" field to reuse another service look like @function getPaymentSettings
 */
export default class GraphqlAPI {
  _client = null;

  static initClient = (config) => {
    this._client = configureClient(config || AppConfig.Shopify);
    // console.log(this._client);
    try {
      return this._client
        .send(GET_SHOP(this._client))
        .then((res) => {
          if (res.errors) {
            return formatError(res.errors);
          }
          const model = res.model.shop;
          console.log(model);
          return model;
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };

  /**
   * Get shop to test url and get info shop
   */
  static getShop = () => {
    try {
      return this._client
        .send(GET_SHOP(this._client))
        .then((res) => {
          if (res.errors) {
            return formatError(res.errors);
          }
          const model = res.model.shop;
          console.log(model);
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };

  /**
   * @function getProducts get all products
   * @param {number} pageSize
   * @param {string} cursor
   */
  static getProducts = ({ pageSize = PER_PAGE, cursor }) => {
    try {
      return this._client
        .send(GET_PRODUCTS(this._client), { pageSize, cursor })
        .then((res) => {
          if (res.errors) {
            return formatError(res.errors);
          }
          const products = res.data.shop.products;
          const model = res.model.shop;
          return {
            hasNextPage: getHasNextPage(products),
            list: model.products.map((o) => {
              return formatProduct(o);
            }),
            cursor: getCursor(products),
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * @function getProductsByName get all products by name query
   * @param {number} pageSize
   * @param {string} cursor
   * @param {String} query
   */
  static getProductsByName = ({
    pageSize = PER_PAGE_SEARCH,
    cursor,
    query,
  }) => {
    try {
      return this._client
        .send(GET_PRODUCTS_BY_NAME(this._client), { pageSize, cursor, query })
        .then((res) => {
          if (res.errors) {
            return formatError(res.errors);
          }
          const products = res.data.shop.products;
          const model = res.model.shop;
          return {
            hasNextPage: getHasNextPage(products),
            list: model.products.map((o) => {
              return formatProduct(o);
            }),
            cursor: getCursor(products),
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * @param {number} categoryId
   * @param {number} pageSize
   * @param {string} cursor
   */
  static getProductsByCollection = ({
    categoryId,
    pageSize = PER_PAGE,
    cursor,
  }) => {
    try {
      return this._client
        .send(GET_PRODUCTS_BY_COLLECTION(this._client), {
          categoryId,
          pageSize,
          cursor,
        })
        .then((res) => {
          const model = checkAndFormatData(res, "node");
          if (model.error) return model;

          const products = res.data.node.products;
          const data = model.products.map((o) => {
            return formatProduct(o);
          });

          return {
            hasNextPage: getHasNextPage(products),
            list: data,
            cursor: getCursor(products),
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * @param {number} categoryId
   * @param {number} pageSize
   * @param {string} cursor
   */
  static getRelatedProductsByCollection = ({ query, pageSize = PER_PAGE }) => {
    try {
      return this._client
        .send(GET_RELATED_PRODUCTS_BY_COLLECTION(this._client), {
          query,
          pageSize,
        })
        .then((res) => {
          const model = checkAndFormatData(res, "shop");
          if (model.error) return model;
          const data = model.products.map((o) => {
            return formatProduct(o);
          });
          return {
            list: data,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * @function getCollections
   */
  static getCollections = () => {
    try {
      return this._client
        .send(GET_COLLECTIONS(this._client))
        .then((res) => {
          if (res.errors) {
            return formatError(res.errors);
          }
          const model = res.model.shop;
          const newCollections = model.collections.map((c) => new Category(c));
          return {
            collections: newCollections,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * apply coupon
   * @param {string} discountCode
   * @param {string} checkoutId
   */
  static applyCoupon = ({ discountCode, checkoutId }) => {
    try {
      return this._client
        .send(APPLY_COUPON(this._client), { discountCode, checkoutId })
        .then((res) => {
          const model = checkAndFormatData(res, "checkoutDiscountCodeApply");
          if (model.error) return model;
          return {
            data: {
              totalPrice: model.checkout.totalPrice,
              subtotalPrice: model.checkout.subtotalPrice,
            },
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * remove coupon
   * @param {string} checkoutId
   */
  static removeCoupon = ({ checkoutId }) => {
    try {
      return this._client
        .send(REMOVE_COUPON(this._client), { checkoutId })
        .then((res) => {
          const model = checkAndFormatData(res, "checkoutDiscountCodeRemove");
          if (model.error) return model;
          return {
            data: {
              totalPrice: model.checkout.totalPrice,
              subtotalPrice: model.checkout.subtotalPrice,
            },
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * check checkout Id existed or completed
   * @param {String} checkoutId
   */
  static checkCheckoutCompleted = ({ checkoutId }) => {
    try {
      return this._client
        .send(CHECK_CHECKOUT(this._client), { checkoutId })
        .then((res) => {
          if (res.errors) {
            return formatError(res.errors);
          }
          const model = res.model.node;
          return {
            completedAt: model.completedAt,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * create checkout
   * @param {object} input
   */
  static createCheckout = (input) => {
    try {
      return this._client
        .send(CREATE_CHECKOUT(this._client), input)
        .then((res) => {
          if (res.errors) {
            return formatError(res.errors);
          }
          const model = res.model.checkoutCreate;
          const newCheckout = convertProductModelFromCheckout(model);
          return {
            checkout: newCheckout,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * add lineItems to checkout
   */
  static addCheckout = ({ checkoutId, lineItems }) => {
    try {
      return this._client
        .send(ADD_CHECKOUT(this._client), { checkoutId, lineItems })
        .then((res) => {
          if (res.errors) {
            return formatError(res.errors);
          }
          const model = res.model.checkoutLineItemsAdd;
          const newCheckout = convertProductModelFromCheckout(model);
          return {
            checkout: newCheckout,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * update lineItems to checkout
   */
  static updateCheckout = ({ checkoutId, lineItems }) => {
    try {
      return this._client
        .send(UPDATE_CHECKOUT(this._client), { checkoutId, lineItems })
        .then((res) => {
          if (res.errors) {
            return formatError(res.errors);
          }
          const model = res.model.checkoutLineItemsUpdate;
          console.log(res.model);
          const newCheckout = convertProductModelFromCheckout(model);
          return {
            checkout: newCheckout,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * remove lineItems to checkout
   */
  static removeCheckout = ({ checkoutId, lineItemIds }) => {
    try {
      return this._client
        .send(REMOVE_CHECKOUT(this._client), { checkoutId, lineItemIds })
        .then((res) => {
          if (res.errors) {
            return formatError(res.errors);
          }
          const model = res.model.checkoutLineItemsRemove;
          const newCheckout = convertProductModelFromCheckout(model);
          return {
            checkout: newCheckout,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * update checkout shipping address
   */
  static updateCheckoutShippingAddress = ({ checkoutId, shippingAddress }) => {
    try {
      return this._client
        .send(UPDATE_CHECKOUT_SHIPPING_ADDRESS(this._client), {
          checkoutId,
          shippingAddress,
        })
        .then((res) => {
          if (res.errors) {
            return formatError(res.errors);
          }
          const model = res.model.checkoutShippingAddressUpdate;
          if (model.error) return model;
          return {
            availableShippingRates: model.checkout.availableShippingRates,
            shippingAddress: model.checkout.shippingAddress,
            subtotalPrice: model.checkout.subtotalPrice,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * update checkout shipping line
   */
  static updateCheckoutShippingLine = ({ checkoutId, handle }) => {
    try {
      return this._client
        .send(UPDATE_CHECKOUT_SHIPPING_LINE(this._client), {
          checkoutId,
          shippingRateHandle: handle,
        })
        .then((res) => {
          const model = checkAndFormatData(res, "checkoutShippingLineUpdate");
          if (model.error) return model;
          return {
            data: {
              shippingLine: model.checkout.shippingLine,
              webUrl: model.checkout.webUrl,
              subtotalPrice: model.checkout.subtotalPrice,
              totalPrice: model.checkout.totalPrice,
            },
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * line user with checkout
   */
  static checkoutLinkUser = ({ checkoutId, customerAccessToken }) => {
    return this._client
      .send(CHECKOUT_LINK_USER(this._client), {
        checkoutId,
        customerAccessToken,
      })
      .then((res) => {
        const model = checkAndFormatData(res, "checkoutCustomerAssociate");
        if (model.error) return model;
        return {
          data: {
            checkout: model.checkout,
          },
        };
      })
      .catch((error) => {
        console.warn(error);
      });
  };
  /**
   * create customer
   */
  static createCustomer = (input) => {
    try {
      return this._client
        .send(CUSTOMER_CREATE(this._client), { input })
        .then((res) => {
          const model = checkAndFormatData(res, "customerCreate");
          if (model.error) return model;
          return {
            data: model.customer,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * create customer access token
   * login to get access token
   */
  static createCustomerAccessToken = (input) => {
    try {
      return this._client
        .send(CUSTOMER_CREATE_ACCESS_TOKEN(this._client), { input })
        .then((res) => {
          const model = checkAndFormatData(res, "customerAccessTokenCreate");
          if (model.error) return model;
          return {
            data: model,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * renew customer access token
   */
  static renewCustomerAccessToken = ({ accessToken }) => {
    try {
      return this._client
        .send(CUSTOMER_RENEW_ACCESS_TOKEN(this._client), {
          customerAccessToken: accessToken,
        })
        .then((res) => {
          if (res.errors) {
            return formatError(res.errors);
          }
          const model = res.model.customerAccessTokenRenew;
          return {
            customerAccessToken: model.customerAccessToken,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * get user info
   */
  static getCustomerInfo = ({ accessToken }) => {
    try {
      return this._client
        .send(CUSTOMER_INFO(this._client), { accessToken })
        .then((res) => {
          if (res.errors) {
            return formatError(res.errors);
          }
          const model = res.model.customer;
          if (model.error) return model;
          return {
            user: model,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * customer create address
   */
  static customerCreateAddress = ({ accessToken, address }) => {
    try {
      return this._client
        .send(CUSTOMER_ADDRESS_CREATE(this._client), {
          customerAccessToken: accessToken,
          address,
        })
        .then((res) => {
          const model = checkAndFormatData(res, "customerAddressCreate");
          if (model.error) return model;
          return {
            data: model,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * customer update address
   */
  static customerUpdateAddress = ({ accessToken, address, id }) => {
    try {
      return this._client
        .send(CUSTOMER_ADDRESS_UPDATE(this._client), {
          customerAccessToken: accessToken,
          address,
          id,
        })
        .then((res) => {
          const model = checkAndFormatData(res, "customerAddressUpdate");
          if (model.error) return model;
          return {
            data: model,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * customer update default address
   */
  static customerUpdateDefaultAddress = ({ accessToken, addressId }) => {
    try {
      return this._client
        .send(CUSTOMER_DEFAULT_ADDRESS_UPDATE(this._client), {
          customerAccessToken: accessToken,
          addressId,
        })
        .then((res) => {
          const model = checkAndFormatData(res, "customerDefaultAddressUpdate");
          if (model.error) return model;
          return {
            data: model,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * customer delete address
   */
  static customerDeleteAddress = ({ accessToken, id }) => {
    try {
      return this._client
        .send(CUSTOMER_ADDRESS_DELETE(this._client), {
          customerAccessToken: accessToken,
          id,
        })
        .then((res) => {
          const model = checkAndFormatData(res, "customerAddressDelete");
          if (model.error) return model;
          return {
            data: model,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * @function addCreditCard create credit card from web service
   * @param {String} cardVaultUrl
   * @param {Object} creditCard
   * @return vaultId
   * creditCard {
   *   "firstName": "John",
   *   "lastName": "Smith",
   *   "creditCardNumber": "4242424242424242",
   *   "expiresMonth": "12",
   *   "expiresYear": "2019",
   *   "verificationCode": "555"
   *  }
   */
  static addCreditCard = ({ cardVaultUrl, creditCard }) => {
    try {
      return fetch(cardVaultUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creditCard),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((json) => {
          console.log(json);
          return {
            data: json,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * get payment setting
   */
  static getPaymentSettings = () => {
    try {
      return this._client
        .send(GET_PAYMENT_SETTINGS(this._client))
        .then((res) => {
          const model = checkAndFormatData(res, "shop");
          if (model.error) return model;
          return {
            data: model.paymentSettings,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * checkout with credit card
   */
  static checkoutWithCreditCard = (params) => {
    try {
      return this._client
        .send(CHECKOUT_WITH_CREDITCARD(this._client), params)
        .then((res) => {
          const model = checkAndFormatData(
            res,
            "checkoutCompleteWithCreditCard"
          );
          if (model.error) return model;
          return {
            data: model.checkout,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * checkout free
   */
  static checkoutFree = (params) => {
    try {
      return this._client
        .send(CHECKOUT_WITH_FREE(this._client), params)
        .then((res) => {
          const model = checkAndFormatData(res, "checkoutCompleteFree");
          if (model.error) return model;
          return {
            data: model.checkout,
          };
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };
  /**
   * get all order
   * TODO: improve later
   */
  static getOrders = ({ cursor, pageSize = PER_PAGE, customerAccessToken }) => {
    return this._client
      .send(GET_ORDERS(this._client), { cursor, pageSize, customerAccessToken })
      .then((res) => {
        const model = checkAndFormatData(res, "customer");
        const orders = res.data.customer.orders;

        if (model.error) return model;
        console.log(model);

        return {
          data: {
            list: model.orders.map((o) => {
              return {
                ...o,
                lineItems: o.lineItems.map((c) => {
                  return {
                    ...c,
                    variant: {
                      ...c.variant,
                      product: formatProduct(c.variant ? c.variant.product : null),
                    },
                  };
                }),
              };
            }),
            hasNextPage: getHasNextPage(orders),
            cursor: getCursor(orders),
          },
        };
      })
      .catch((error) => {
        console.warn(error);
      });
  };
  /**
   * get all articles
   */
  static getArticles = ({ cursor, pageSize = PER_PAGE }) => {
    return this._client
      .send(GET_ARTICLES(this._client), { cursor, pageSize })
      .then((res) => {
        const model = checkAndFormatData(res, "shop");
        const articles = res.data.shop.articles;

        if (model.error) return model;
        console.log(model);

        return {
          list: model.articles,
          hasNextPage: getHasNextPage(articles),
          cursor: getCursor(articles),
        };
      })
      .catch((error) => {
        console.warn(error);
      });
  };
}
