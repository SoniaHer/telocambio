/** @format */
import Client from "graphql-js-client";

import typeBundle from "./types";

const configureClient = (config) => {
  const client = new Client(typeBundle, {
    url: config.graphqlUrl,
    fetcherOptions: {
      headers: {
        "X-Shopify-Storefront-Access-Token": config.storeAccessToken,
      },
    },
  });

  // console.log(client);

  return client;
};

export default configureClient;
