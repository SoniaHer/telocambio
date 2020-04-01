/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { gql } from "babel-plugin-graphql-js-client-transform";

export const GET_SHOP = (client) => gql(client)`
  query {
    shop {
      name
      description
    }
  }
`;

/**
 * Product
 */
export const GET_PRODUCTS = (client) => gql(
  client
)`query($cursor: String, $pageSize: Int) {
  shop {
    name
    description
    products(first: $pageSize, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          description
          availableForSale
          productType
          onlineStoreUrl
          options {
            id
            name
            values
          }
          variants(first: 250) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
                title
                selectedOptions {
                  name
                  value
                }
                image(maxHeight: 1600, maxWidth: 750) {
                  src
                }
                price
                compareAtPrice
              }
            }
          }
          images(first: 250, maxHeight: 1600, maxWidth: 750) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                src
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_PRODUCTS_BY_NAME = (client) => gql(
  client
)`query($cursor: String, $pageSize: Int, $query: String) {
  shop {
    name
    description
    products(first: $pageSize, after: $cursor, query: $query) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          description
          availableForSale
          productType
          onlineStoreUrl
          collections(first: 1) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
              }
            }
          }
          options {
            id
            name
            values
          }
          variants(first: 250) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
                title
                selectedOptions {
                  name
                  value
                }
                image(maxHeight: 1600, maxWidth: 750) {
                  src
                }
                price
                compareAtPrice
              }
            }
          }
          images(first: 250, maxHeight: 1600, maxWidth: 750) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                src
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_PRODUCTS_BY_COLLECTION = (client) => gql(
  client
)`query($categoryId: ID!, $pageSize: Int ) {
  node(id: $categoryId) {
    id
    ... on Collection {
      title
      products(first: $pageSize) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            id
            title
            description
            availableForSale
            productType
            onlineStoreUrl
            options {
              id
              name
              values
            }
            variants(first: 250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  image(maxHeight: 1600, maxWidth: 750) {
                    src
                  }
                  price
                  compareAtPrice
                }
              }
            }
            images(first: 250, maxHeight: 1600, maxWidth: 750) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_RELATED_PRODUCTS_BY_COLLECTION = (client) => gql(
  client
)` query($query: String, $pageSize: Int) {
  shop {
    products(first: $pageSize, query: $query, sortKey: PRODUCT_TYPE) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          description
          availableForSale
          productType
          onlineStoreUrl
          options {
            id
            name
            values
          }
          variants(first: 250) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
                title
                selectedOptions {
                  name
                  value
                }
                image(maxHeight: 1600, maxWidth: 750) {
                  src
                }
                price
                compareAtPrice
              }
            }
          }
          images(first: 250, maxHeight: 1600, maxWidth: 750) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                src
              }
            }
          }
        }
      }
    }
  }
}
`;

/**
 * Collection
 */
export const GET_COLLECTIONS = (client) => gql(client)`
  query {
    shop {
      collections(first: 250) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            title
            description
            image(maxHeight: 1600, maxWidth: 750) {
              id
              src
            }
          }
        }
      }
    }
  }
`;

/**
 * Checkout
 * shippingAddress {
    address1
    address2
    city
    firstName
    id
    lastName
    zip
    phone
    name
    latitude
    longitude
    province
  }
  availableShippingRates {
  ready
    shippingRates {
      handle
      price
      title
    }
  }
  shippingLine {
    price
    title
    handle
  }
 */
export const CHECK_CHECKOUT = (client) => gql(client)`
  query($checkoutId: ID!) {
    node(id: $checkoutId) {
      ... on Checkout {
        id
        completedAt
      }
    }
  }
`;

export const CREATE_CHECKOUT = (client) => gql(client)`mutation {
    checkoutCreate(input: {}) {
      userErrors {
        message
        field
      }
      checkout {
        id
        webUrl
        subtotalPrice
        totalTax
        totalPrice
        paymentDue
        lineItems(first: 250) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              title
              quantity
              variant {
                title
                image(maxHeight: 1600, maxWidth: 750) {
                  src
                }
                price
                selectedOptions {
                  name
                  value
                }
                product {
                  id
                  title
                  description
                  availableForSale
                  productType
                  onlineStoreUrl
                  options {
                    id
                    name
                    values
                  }
                  variants(first: 250) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        id
                        title
                        selectedOptions {
                          name
                          value
                        }
                        image(maxHeight: 1600, maxWidth: 750) {
                          src
                        }
                        price
                        compareAtPrice
                      }
                    }
                  }
                  images(first: 250, maxHeight: 1600, maxWidth: 750) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
}
`;

export const ADD_CHECKOUT = (client) => gql(
  client
)`mutation checkoutLineItemsAdd(
    $lineItems: [CheckoutLineItemInput!]!
    $checkoutId: ID!
  ) {
    checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
      userErrors {
        field
        message
      }
      checkout {
        id
        webUrl
        subtotalPrice
        totalTax
        totalPrice
        paymentDue
        lineItems(first: 250) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              title
              quantity
              variant {
                title
                image(maxHeight: 1600, maxWidth: 750) {
                  src
                }
                price
                selectedOptions {
                  name
                  value
                }
                product {
                  id
                  title
                  description
                  availableForSale
                  productType
                  onlineStoreUrl
                  options {
                    id
                    name
                    values
                  }
                  variants(first: 250) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        id
                        title
                        selectedOptions {
                          name
                          value
                        }
                        image(maxHeight: 1600, maxWidth: 750) {
                          src
                        }
                        price
                        compareAtPrice
                      }
                    }
                  }
                  images(first: 250, maxHeight: 1600, maxWidth: 750) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_CHECKOUT = (client) => gql(
  client
)`mutation checkoutLineItemsUpdate(
    $lineItems: [CheckoutLineItemUpdateInput!]!
    $checkoutId: ID!
  ) {
    checkoutLineItemsUpdate(lineItems: $lineItems, checkoutId: $checkoutId) {
      userErrors {
        field
        message
      }
      checkout {
        id
        webUrl
        totalPrice
        subtotalPrice
        paymentDue
        lineItems(first: 250) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              title
              quantity
              variant {
                title
                image(maxHeight: 1600, maxWidth: 750) {
                  src
                }
                price
                selectedOptions {
                  name
                  value
                }
                product {
                  id
                  title
                  description
                  availableForSale
                  productType
                  onlineStoreUrl
                  options {
                    id
                    name
                    values
                  }
                  variants(first: 250) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        id
                        title
                        selectedOptions {
                          name
                          value
                        }
                        image(maxHeight: 1600, maxWidth: 750) {
                          src
                        }
                        price
                        compareAtPrice
                      }
                    }
                  }
                  images(first: 250, maxHeight: 1600, maxWidth: 750) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const REMOVE_CHECKOUT = (client) => gql(
  client
)`mutation checkoutLineItemsRemove(
    $lineItemIds: [ID!]!
    $checkoutId: ID!
  ) {
    checkoutLineItemsRemove(lineItemIds: $lineItemIds, checkoutId: $checkoutId) {
      userErrors {
        field
        message
      }
      checkout {
        id
        webUrl
        subtotalPrice
        totalTax
        totalPrice
        paymentDue
        lineItems(first: 250) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              title
              quantity
              variant {
                title
                image(maxHeight: 1600, maxWidth: 750) {
                  src
                }
                price
                selectedOptions {
                  name
                  value
                }
                product {
                  id
                  title
                  description
                  availableForSale
                  productType
                  onlineStoreUrl
                  options {
                    id
                    name
                    values
                  }
                  variants(first: 250) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        id
                        title
                        selectedOptions {
                          name
                          value
                        }
                        image(maxHeight: 1600, maxWidth: 750) {
                          src
                        }
                        price
                        compareAtPrice
                      }
                    }
                  }
                  images(first: 250, maxHeight: 1600, maxWidth: 750) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// checkout shipping address
export const UPDATE_CHECKOUT_SHIPPING_ADDRESS = (client) => gql(client)`
  mutation checkoutShippingAddressUpdate($shippingAddress: MailingAddressInput!, $checkoutId: ID!) {
    checkoutShippingAddressUpdate(shippingAddress: $shippingAddress, checkoutId: $checkoutId) {
      userErrors {
        field
        message
      }
      checkout {
        id
        webUrl
        subtotalPrice
        totalTax
        totalPrice
        paymentDue
        shippingAddress {
          address1
          address2
          city
          firstName
          id
          lastName
          zip
          phone
          name
          latitude
          longitude
          province
          country
          countryCode
        }
        availableShippingRates {
          ready
          shippingRates {
            handle
            price
            title
          }
        }
        shippingLine {
          price
          title
          handle
        }
        lineItems(first: 250) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              title
              quantity
              variant {
                title
                image(maxHeight: 1600, maxWidth: 750) {
                  src
                }
                price
                selectedOptions {
                  name
                  value
                }
                product {
                  id
                  title
                  description
                  availableForSale
                  productType
                  onlineStoreUrl
                  options {
                    id
                    name
                    values
                  }
                  variants(first: 250) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        id
                        title
                        selectedOptions {
                          name
                          value
                        }
                        image(maxHeight: 1600, maxWidth: 750) {
                          src
                        }
                        price
                        compareAtPrice
                      }
                    }
                  }
                  images(first: 250, maxHeight: 1600, maxWidth: 750) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// checkout shipping line
export const UPDATE_CHECKOUT_SHIPPING_LINE = (client) => gql(client)`
  mutation checkoutShippingLineUpdate($shippingRateHandle: String!, $checkoutId: ID!) {
    checkoutShippingLineUpdate(shippingRateHandle: $shippingRateHandle, checkoutId: $checkoutId) {
      userErrors {
        field
        message
      }
      checkout {
        id
        webUrl
        subtotalPrice
        totalTax
        totalPrice
        paymentDue
        shippingLine {
          price
          title
          handle
        }
        lineItems(first: 250) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              title
              quantity
              variant {
                title
                image(maxHeight: 1600, maxWidth: 750) {
                  src
                }
                price
                selectedOptions {
                  name
                  value
                }
                product {
                  id
                  title
                  description
                  availableForSale
                  productType
                  onlineStoreUrl
                  options {
                    id
                    name
                    values
                  }
                  variants(first: 250) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        id
                        title
                        selectedOptions {
                          name
                          value
                        }
                        image(maxHeight: 1600, maxWidth: 750) {
                          src
                        }
                        price
                        compareAtPrice
                      }
                    }
                  }
                  images(first: 250, maxHeight: 1600, maxWidth: 750) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const APPLY_COUPON = (client) => gql(
  client
)`mutation checkoutDiscountCodeApply($discountCode: String!, $checkoutId: ID!) {
    checkoutDiscountCodeApply(discountCode: $discountCode, checkoutId: $checkoutId) {
      userErrors {
        field
        message
      }
      checkout {
        id
        webUrl
        totalPrice
        subtotalPrice
        paymentDue
      }
    }
  }
`;

export const REMOVE_COUPON = (client) => gql(
  client
)`mutation checkoutDiscountCodeRemove($checkoutId: ID!) {
    checkoutDiscountCodeRemove(checkoutId: $checkoutId) {
      userErrors {
        field
        message
      }
      checkout {
        id
        webUrl
        totalPrice
        subtotalPrice
        paymentDue
      }
    }
  }
`;

export const CHECKOUT_LINK_USER = (client) => gql(
  client
)`mutation checkoutCustomerAssociate($checkoutId: ID!, $customerAccessToken: String!) {
  checkoutCustomerAssociate(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
    userErrors {
      field
      message
    }
    checkout {
      id
    }
  }
}
`;

/**
 * customer is user
 */
export const CUSTOMER_CREATE = (client) => gql(client)`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      userErrors {
        field
        message
      }
      customer {
        id
        email
        firstName
        lastName
        phone
      }
    }
  }
`;

export const CUSTOMER_CREATE_ACCESS_TOKEN = (client) => gql(client)`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      userErrors {
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

export const CUSTOMER_RENEW_ACCESS_TOKEN = (client) => gql(client)`
  mutation customerAccessTokenRenew($customerAccessToken: String!) {
    customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
      userErrors {
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

export const CUSTOMER_INFO = (client) => gql(client)`
  query($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      email
      createdAt
      displayName
      phone
      firstName
      lastName
      defaultAddress {
        address1
        address2
        city
        firstName
        id
        lastName
        zip
        phone
        name
        latitude
        longitude
        province
        country
        countryCode
      }
      addresses(first: 10) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            address1
            address2
            city
            firstName
            id
            lastName
            zip
            phone
            name
            latitude
            longitude
            province
            country
            countryCode
          }
        }
      }
    }
  }
`;

export const CUSTOMER_ADDRESS_CREATE = (client) => gql(client)`
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      userErrors {
        field
        message
      }
      customerAddress {
        address1
        address2
        city
        firstName
        id
        lastName
        zip
        phone
        name
        latitude
        longitude
        province
        country
        countryCode
      }
    }
  }
`;

export const CUSTOMER_ADDRESS_UPDATE = (client) => gql(client)`
  mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
      userErrors {
        field
        message
      }
      customerAddress {
        address1
        address2
        city
        firstName
        id
        lastName
        zip
        phone
        name
        latitude
        longitude
        province
        country
        countryCode
      }
    }
  }
`;

export const CUSTOMER_ADDRESS_DELETE = (client) => gql(client)`
  mutation customerAddressDelete($id: ID!, $customerAccessToken: String!) {
    customerAddressDelete(id: $id, customerAccessToken: $customerAccessToken) {
      userErrors {
        field
        message
      }
      deletedCustomerAddressId
    }
  }
`;

export const CUSTOMER_DEFAULT_ADDRESS_UPDATE = (client) => gql(client)`
  mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
    customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
      userErrors {
        field
        message
      }
      customer {
        id
        email
        createdAt
        displayName
        phone
        firstName
        lastName
        defaultAddress {
          address1
          address2
          city
          firstName
          id
          lastName
          zip
          phone
          name
          latitude
          longitude
          province
          country
          countryCode
        }
        addresses(first: 10) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              address1
              address2
              city
              firstName
              id
              lastName
              zip
              phone
              name
              latitude
              longitude
              province
              country
              countryCode
            }
          }
        }
      }
    }
  }
`;

/**
 * payment
 */
export const GET_PAYMENT_SETTINGS = (client) => gql(client)`query {
  shop {
    paymentSettings {
      cardVaultUrl
      acceptedCardBrands
      countryCode
      currencyCode
      shopifyPaymentsAccountId
      supportedDigitalWallets
    }
  }
}
`;

export const CHECKOUT_WITH_CREDITCARD = (client) => gql(
  client
)`mutation checkoutCompleteWithCreditCard($checkoutId: ID!, $payment: CreditCardPaymentInput!) {
  checkoutCompleteWithCreditCard(checkoutId: $checkoutId, payment: $payment) {
    userErrors {
      field
      message
    }
    checkout {
      id
    }
    payment {
      id
    }
  }
}
`;

export const CHECKOUT_WITH_FREE = (client) => gql(
  client
)`mutation checkoutCompleteFree($checkoutId: ID!) {
  checkoutCompleteFree(checkoutId: $checkoutId) {
    userErrors {
      field
      message
    }
    checkout {
      id
    }
  }
}
`;

/**
 * order
 */
export const GET_ORDERS = (client) => gql(client)`
  query($cursor: String, $pageSize: Int, $customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: $pageSize, after: $cursor) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            processedAt
            orderNumber
            totalPrice
            statusUrl
            lineItems(first: $pageSize) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  quantity
                  title
                  variant {
                    title
                    image(maxHeight: 1600, maxWidth: 750) {
                      src
                    }
                    price
                    selectedOptions {
                      name
                      value
                    }
                    product {
                      id
                      title
                      description
                      availableForSale
                      productType
                      onlineStoreUrl
                      options {
                        id
                        name
                        values
                      }
                      variants(first: 250) {
                        pageInfo {
                          hasNextPage
                          hasPreviousPage
                        }
                        edges {
                          node {
                            id
                            title
                            selectedOptions {
                              name
                              value
                            }
                            image(maxHeight: 1600, maxWidth: 750) {
                              src
                            }
                            price
                            compareAtPrice
                          }
                        }
                      }
                      images(first: 250, maxHeight: 1600, maxWidth: 750) {
                        pageInfo {
                          hasNextPage
                          hasPreviousPage
                        }
                        edges {
                          node {
                            src
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * blogs
 */
export const GET_ARTICLES = (client) => gql(client)`
query($cursor: String, $pageSize: Int) {
  shop {
    articles(first: $pageSize, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          title
          author {
            name
          }
          id
          content 
          image(maxHeight: 1600, maxWidth: 750) {
            src
          }
          publishedAt
        }
      }
    }
  }
}
`;
