/** @format */

const Checkout = {
  name: "Checkout",
  kind: "OBJECT",
  fieldBaseTypes: {
    appliedGiftCards: "AppliedGiftCard",
    availableShippingRates: "AvailableShippingRates",
    completedAt: "DateTime",
    createdAt: "DateTime",
    currencyCode: "CurrencyCode",
    customAttributes: "Attribute",
    customer: "Customer",
    email: "String",
    id: "ID",
    lineItems: "CheckoutLineItemConnection",
    note: "String",
    order: "Order",
    orderStatusUrl: "URL",
    paymentDue: "Money",
    ready: "Boolean",
    requiresShipping: "Boolean",
    shippingAddress: "MailingAddress",
    shippingLine: "ShippingRate",
    subtotalPrice: "Money",
    taxExempt: "Boolean",
    taxesIncluded: "Boolean",
    totalPrice: "Money",
    totalTax: "Money",
    updatedAt: "DateTime",
    vaultUrl: "URL",
    webUrl: "URL",
  },
  implementsNode: true,
};
Object.freeze(Checkout.fieldBaseTypes);
const Checkout$1 = Object.freeze(Checkout);

const ID = {
  name: "ID",
  kind: "SCALAR",
};
const ID$1 = Object.freeze(ID);

const Boolean = {
  name: "Boolean",
  kind: "SCALAR",
};
const Boolean$1 = Object.freeze(Boolean);

const CheckoutLineItemConnection = {
  name: "CheckoutLineItemConnection",
  kind: "OBJECT",
  fieldBaseTypes: {
    edges: "CheckoutLineItemEdge",
    pageInfo: "PageInfo",
  },
  implementsNode: false,
};
Object.freeze(CheckoutLineItemConnection.fieldBaseTypes);
const CheckoutLineItemConnection$1 = Object.freeze(CheckoutLineItemConnection);

const PageInfo = {
  name: "PageInfo",
  kind: "OBJECT",
  fieldBaseTypes: {
    hasNextPage: "Boolean",
    hasPreviousPage: "Boolean",
  },
  implementsNode: false,
};
Object.freeze(PageInfo.fieldBaseTypes);
const PageInfo$1 = Object.freeze(PageInfo);

const CheckoutLineItemEdge = {
  name: "CheckoutLineItemEdge",
  kind: "OBJECT",
  fieldBaseTypes: {
    cursor: "String",
    node: "CheckoutLineItem",
  },
  implementsNode: false,
};
Object.freeze(CheckoutLineItemEdge.fieldBaseTypes);
const CheckoutLineItemEdge$1 = Object.freeze(CheckoutLineItemEdge);

const String = {
  name: "String",
  kind: "SCALAR",
};
const String$1 = Object.freeze(String);

const CheckoutLineItem = {
  name: "CheckoutLineItem",
  kind: "OBJECT",
  fieldBaseTypes: {
    customAttributes: "Attribute",
    id: "ID",
    quantity: "Int",
    title: "String",
    variant: "ProductVariant",
  },
  implementsNode: true,
};
Object.freeze(CheckoutLineItem.fieldBaseTypes);
const CheckoutLineItem$1 = Object.freeze(CheckoutLineItem);

const ProductVariant = {
  name: "ProductVariant",
  kind: "OBJECT",
  fieldBaseTypes: {
    available: "Boolean",
    id: "ID",
    image: "Image",
    price: "Money",
    product: "Product",
    selectedOptions: "SelectedOption",
    title: "String",
    weight: "Float",
    weightUnit: "WeightUnit",
    compareAtPrice: "Money"
  },
  implementsNode: true,
};
Object.freeze(ProductVariant.fieldBaseTypes);
const ProductVariant$1 = Object.freeze(ProductVariant);

const Float = {
  name: "Float",
  kind: "SCALAR",
};
const Float$1 = Object.freeze(Float);

const WeightUnit = {
  name: "WeightUnit",
  kind: "ENUM",
};
const WeightUnit$1 = Object.freeze(WeightUnit);

const Money = {
  name: "Money",
  kind: "SCALAR",
};
const Money$1 = Object.freeze(Money);

const Image = {
  name: "Image",
  kind: "OBJECT",
  fieldBaseTypes: {
    altText: "String",
    id: "ID",
    src: "URL",
  },
  implementsNode: false,
};
Object.freeze(Image.fieldBaseTypes);
const Image$1 = Object.freeze(Image);

const URL = {
  name: "URL",
  kind: "SCALAR",
};
const URL$1 = Object.freeze(URL);

const Int = {
  name: "Int",
  kind: "SCALAR",
};
const Int$1 = Object.freeze(Int);

const CropRegion = {
  name: "CropRegion",
  kind: "ENUM",
};
const CropRegion$1 = Object.freeze(CropRegion);

const SelectedOption = {
  name: "SelectedOption",
  kind: "OBJECT",
  fieldBaseTypes: {
    name: "String",
    value: "String",
  },
  implementsNode: false,
};
Object.freeze(SelectedOption.fieldBaseTypes);
const SelectedOption$1 = Object.freeze(SelectedOption);

const Product = {
  name: "Product",
  kind: "OBJECT",
  fieldBaseTypes: {
    availableForSale: "Boolean",
    collections: "CollectionConnection",
    createdAt: "DateTime",
    description: "String",
    descriptionHtml: "HTML",
    handle: "String",
    id: "ID",
    images: "ImageConnection",
    options: "ProductOption",
    productType: "String",
    onlineStoreUrl: "URL",
    publishedAt: "DateTime",
    tags: "String",
    title: "String",
    updatedAt: "DateTime",
    variantBySelectedOptions: "ProductVariant",
    variants: "ProductVariantConnection",
    vendor: "String",
  },
  implementsNode: true,
};
Object.freeze(Product.fieldBaseTypes);
const Product$1 = Object.freeze(Product);

const ArticleConnection = {
  name: "ArticleConnection",
  kind: "OBJECT",
  fieldBaseTypes: {
    edges: "ArticleEdge",
    pageInfo: "PageInfo",
  },
  implementsNode: false,
};
Object.freeze(ArticleConnection.fieldBaseTypes);
const ArticleConnection$1 = Object.freeze(ArticleConnection);

const ArticleEdge = {
  name: "ArticleEdge",
  kind: "OBJECT",
  fieldBaseTypes: {
    cursor: "String",
    node: "Article",
  },
  implementsNode: false,
};
Object.freeze(ArticleEdge.fieldBaseTypes);
const ArticleEdge$1 = Object.freeze(ArticleEdge);

const Article = {
  name: "Article",
  kind: "OBJECT",
  fieldBaseTypes: {
    author: "ArticleAuthor",
    content: "String",
    handle: "String",
    id: "ID",
    image: "Image",
    publishedAt: "DateTime",
    title: "String",
    url: "URL"
  },
  implementsNode: true,
};
Object.freeze(Article.fieldBaseTypes);
const Article$1 = Object.freeze(Article);

const ArticleAuthor = {
  name: "ArticleAuthor",
  kind: "OBJECT",
  fieldBaseTypes: {
    bio: "String",
    email: "String",
    firstName: "String",
    lastName: "String",
    name: "String",
  },
  implementsNode: false,
};
Object.freeze(ArticleAuthor.fieldBaseTypes);
const ArticleAuthor$1 = Object.freeze(ArticleAuthor);

const CollectionConnection = {
  name: "CollectionConnection",
  kind: "OBJECT",
  fieldBaseTypes: {
    edges: "CollectionEdge",
    pageInfo: "PageInfo",
  },
  implementsNode: false,
};
Object.freeze(CollectionConnection.fieldBaseTypes);
const CollectionConnection$1 = Object.freeze(CollectionConnection);

const CollectionEdge = {
  name: "CollectionEdge",
  kind: "OBJECT",
  fieldBaseTypes: {
    cursor: "String",
    node: "Collection",
  },
  implementsNode: false,
};
Object.freeze(CollectionEdge.fieldBaseTypes);
const CollectionEdge$1 = Object.freeze(CollectionEdge);

const Collection = {
  name: "Collection",
  kind: "OBJECT",
  fieldBaseTypes: {
    description: "String",
    descriptionHtml: "HTML",
    handle: "String",
    id: "ID",
    image: "Image",
    products: "ProductConnection",
    title: "String",
    updatedAt: "DateTime",
  },
  implementsNode: true,
};
Object.freeze(Collection.fieldBaseTypes);
const Collection$1 = Object.freeze(Collection);

const HTML = {
  name: "HTML",
  kind: "SCALAR",
};
const HTML$1 = Object.freeze(HTML);

const DateTime = {
  name: "DateTime",
  kind: "SCALAR",
};
const DateTime$1 = Object.freeze(DateTime);

const ProductConnection = {
  name: "ProductConnection",
  kind: "OBJECT",
  fieldBaseTypes: {
    edges: "ProductEdge",
    pageInfo: "PageInfo",
  },
  implementsNode: false,
};
Object.freeze(ProductConnection.fieldBaseTypes);
const ProductConnection$1 = Object.freeze(ProductConnection);

const ProductEdge = {
  name: "ProductEdge",
  kind: "OBJECT",
  fieldBaseTypes: {
    cursor: "String",
    node: "Product",
  },
  implementsNode: false,
};
Object.freeze(ProductEdge.fieldBaseTypes);
const ProductEdge$1 = Object.freeze(ProductEdge);

const Node = {
  name: "Node",
  kind: "INTERFACE",
  fieldBaseTypes: {
    id: "ID",
  },
  possibleTypes: [
    "AppliedGiftCard",
    "Checkout",
    "CheckoutLineItem",
    "Collection",
    "MailingAddress",
    "Order",
    "Payment",
    "Product",
    "ProductOption",
    "ProductVariant",
    "ShopPolicy",
    "Article"
  ],
};
Object.freeze(Node.fieldBaseTypes);
Object.freeze(Node.possibleTypes);
const Node$1 = Object.freeze(Node);

const ImageConnection = {
  name: "ImageConnection",
  kind: "OBJECT",
  fieldBaseTypes: {
    edges: "ImageEdge",
    pageInfo: "PageInfo",
  },
  implementsNode: false,
};
Object.freeze(ImageConnection.fieldBaseTypes);
const ImageConnection$1 = Object.freeze(ImageConnection);

const ImageEdge = {
  name: "ImageEdge",
  kind: "OBJECT",
  fieldBaseTypes: {
    cursor: "String",
    node: "Image",
  },
  implementsNode: false,
};
Object.freeze(ImageEdge.fieldBaseTypes);
const ImageEdge$1 = Object.freeze(ImageEdge);

const SelectedOptionInput = {
  name: "SelectedOptionInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    name: "String",
    value: "String",
  },
};
Object.freeze(SelectedOptionInput.inputFieldBaseTypes);
const SelectedOptionInput$1 = Object.freeze(SelectedOptionInput);

const ProductOption = {
  name: "ProductOption",
  kind: "OBJECT",
  fieldBaseTypes: {
    id: "ID",
    name: "String",
    values: "String",
  },
  implementsNode: true,
};
Object.freeze(ProductOption.fieldBaseTypes);
const ProductOption$1 = Object.freeze(ProductOption);

const ProductVariantConnection = {
  name: "ProductVariantConnection",
  kind: "OBJECT",
  fieldBaseTypes: {
    edges: "ProductVariantEdge",
    pageInfo: "PageInfo",
  },
  implementsNode: false,
};
Object.freeze(ProductVariantConnection.fieldBaseTypes);
const ProductVariantConnection$1 = Object.freeze(ProductVariantConnection);

const ProductVariantEdge = {
  name: "ProductVariantEdge",
  kind: "OBJECT",
  fieldBaseTypes: {
    cursor: "String",
    node: "ProductVariant",
  },
  implementsNode: false,
};
Object.freeze(ProductVariantEdge.fieldBaseTypes);
const ProductVariantEdge$1 = Object.freeze(ProductVariantEdge);

const Attribute = {
  name: "Attribute",
  kind: "OBJECT",
  fieldBaseTypes: {
    key: "String",
    value: "String",
  },
  implementsNode: false,
};
Object.freeze(Attribute.fieldBaseTypes);
const Attribute$1 = Object.freeze(Attribute);

const MailingAddress = {
  name: "MailingAddress",
  kind: "OBJECT",
  fieldBaseTypes: {
    address1: "String",
    address2: "String",
    city: "String",
    company: "String",
    country: "String",
    countryCode: "String",
    firstName: "String",
    formatted: "String",
    id: "ID",
    lastName: "String",
    latitude: "Float",
    longitude: "Float",
    name: "String",
    phone: "String",
    province: "String",
    provinceCode: "String",
    zip: "String",
  },
  implementsNode: true,
};
Object.freeze(MailingAddress.fieldBaseTypes);
const MailingAddress$1 = Object.freeze(MailingAddress);

const ShippingRate = {
  name: "ShippingRate",
  kind: "OBJECT",
  fieldBaseTypes: {
    handle: "String",
    price: "Money",
    title: "String",
  },
  implementsNode: false,
};
Object.freeze(ShippingRate.fieldBaseTypes);
const ShippingRate$1 = Object.freeze(ShippingRate);

const AvailableShippingRates = {
  name: "AvailableShippingRates",
  kind: "OBJECT",
  fieldBaseTypes: {
    ready: "Boolean",
    shippingRates: "ShippingRate",
  },
  implementsNode: false,
};
Object.freeze(AvailableShippingRates.fieldBaseTypes);
const AvailableShippingRates$1 = Object.freeze(AvailableShippingRates);

const Customer = {
  name: "Customer",
  kind: "OBJECT",
  fieldBaseTypes: {
    acceptsMarketing: "Boolean",
    addresses: "MailingAddressConnection",
    createdAt: "DateTime",
    defaultAddress: "MailingAddress",
    displayName: "String",
    email: "String",
    firstName: "String",
    id: "ID",
    lastName: "String",
    orders: "OrderConnection",
    phone: "String",
    updatedAt: "DateTime",
  },
  implementsNode: false,
};
Object.freeze(Customer.fieldBaseTypes);
const Customer$1 = Object.freeze(Customer);

const MailingAddressConnection = {
  name: "MailingAddressConnection",
  kind: "OBJECT",
  fieldBaseTypes: {
    edges: "MailingAddressEdge",
    pageInfo: "PageInfo",
  },
  implementsNode: false,
};
Object.freeze(MailingAddressConnection.fieldBaseTypes);
const MailingAddressConnection$1 = Object.freeze(MailingAddressConnection);

const MailingAddressEdge = {
  name: "MailingAddressEdge",
  kind: "OBJECT",
  fieldBaseTypes: {
    cursor: "String",
    node: "MailingAddress",
  },
  implementsNode: false,
};
Object.freeze(MailingAddressEdge.fieldBaseTypes);
const MailingAddressEdge$1 = Object.freeze(MailingAddressEdge);

const OrderConnection = {
  name: "OrderConnection",
  kind: "OBJECT",
  fieldBaseTypes: {
    edges: "OrderEdge",
    pageInfo: "PageInfo",
  },
  implementsNode: false,
};
Object.freeze(OrderConnection.fieldBaseTypes);
const OrderConnection$1 = Object.freeze(OrderConnection);

const OrderEdge = {
  name: "OrderEdge",
  kind: "OBJECT",
  fieldBaseTypes: {
    cursor: "String",
    node: "Order",
  },
  implementsNode: false,
};
Object.freeze(OrderEdge.fieldBaseTypes);
const OrderEdge$1 = Object.freeze(OrderEdge);

const Order = {
  name: "Order",
  kind: "OBJECT",
  fieldBaseTypes: {
    cancelReason: "OrderCancelReason",
    cancelledAt: "DateTime",
    createdAt: "DateTime",
    currencyCode: "CurrencyCode",
    customerUrl: "URL",
    displayFinancialStatus: "OrderDisplayFinancialStatus",
    displayFulfillmentStatus: "OrderDisplayFulfillmentStatus",
    email: "String",
    id: "ID",
    lineItems: "OrderLineItemConnection",
    orderNumber: "Int",
    statusUrl: "URL",
    phone: "String",
    processedAt: "DateTime",
    shippingAddress: "MailingAddress",
    subtotalPrice: "Money",
    totalPrice: "Money",
    totalRefunded: "Money",
    totalShippingPrice: "Money",
    totalTax: "Money",
    updatedAt: "DateTime",
  },
  implementsNode: true,
};
Object.freeze(Order.fieldBaseTypes);
const Order$1 = Object.freeze(Order);

const OrderCancelReason = {
  name: "OrderCancelReason",
  kind: "ENUM",
};
const OrderCancelReason$1 = Object.freeze(OrderCancelReason);

const CurrencyCode = {
  name: "CurrencyCode",
  kind: "ENUM",
};
const CurrencyCode$1 = Object.freeze(CurrencyCode);

const OrderDisplayFulfillmentStatus = {
  name: "OrderDisplayFulfillmentStatus",
  kind: "ENUM",
};
const OrderDisplayFulfillmentStatus$1 = Object.freeze(
  OrderDisplayFulfillmentStatus
);

const OrderDisplayFinancialStatus = {
  name: "OrderDisplayFinancialStatus",
  kind: "ENUM",
};
const OrderDisplayFinancialStatus$1 = Object.freeze(
  OrderDisplayFinancialStatus
);

const OrderLineItemConnection = {
  name: "OrderLineItemConnection",
  kind: "OBJECT",
  fieldBaseTypes: {
    edges: "OrderLineItemEdge",
    pageInfo: "PageInfo",
  },
  implementsNode: false,
};
Object.freeze(OrderLineItemConnection.fieldBaseTypes);
const OrderLineItemConnection$1 = Object.freeze(OrderLineItemConnection);

const OrderLineItemEdge = {
  name: "OrderLineItemEdge",
  kind: "OBJECT",
  fieldBaseTypes: {
    cursor: "String",
    node: "OrderLineItem",
  },
  implementsNode: false,
};
Object.freeze(OrderLineItemEdge.fieldBaseTypes);
const OrderLineItemEdge$1 = Object.freeze(OrderLineItemEdge);

const OrderLineItem = {
  name: "OrderLineItem",
  kind: "OBJECT",
  fieldBaseTypes: {
    customAttributes: "Attribute",
    quantity: "Int",
    title: "String",
    variant: "ProductVariant",
  },
  implementsNode: false,
};
Object.freeze(OrderLineItem.fieldBaseTypes);
const OrderLineItem$1 = Object.freeze(OrderLineItem);

const OrderSortKeys = {
  name: "OrderSortKeys",
  kind: "ENUM",
};
const OrderSortKeys$1 = Object.freeze(OrderSortKeys);

const AppliedGiftCard = {
  name: "AppliedGiftCard",
  kind: "OBJECT",
  fieldBaseTypes: {
    amountUsed: "Money",
    balance: "Money",
    id: "ID",
    lastCharacters: "String",
  },
  implementsNode: true,
};
Object.freeze(AppliedGiftCard.fieldBaseTypes);
const AppliedGiftCard$1 = Object.freeze(AppliedGiftCard);

const QueryRoot = {
  name: "QueryRoot",
  kind: "OBJECT",
  fieldBaseTypes: {
    customer: "Customer",
    node: "Node",
    nodes: "Node",
    shop: "Shop",
  },
  implementsNode: false,
};
Object.freeze(QueryRoot.fieldBaseTypes);
const QueryRoot$1 = Object.freeze(QueryRoot);

const Shop = {
  name: "Shop",
  kind: "OBJECT",
  fieldBaseTypes: {
    articles: "ArticleConnection",
    collections: "CollectionConnection",
    currencyCode: "CurrencyCode",
    description: "String",
    moneyFormat: "String",
    name: "String",
    primaryDomain: "Domain",
    privacyPolicy: "ShopPolicy",
    products: "ProductConnection",
    paymentSettings: "PaymentSettings",
    refundPolicy: "ShopPolicy",
    termsOfService: "ShopPolicy",
  },
  implementsNode: false,
};
Object.freeze(Shop.fieldBaseTypes);
const Shop$1 = Object.freeze(Shop);

const Domain = {
  name: "Domain",
  kind: "OBJECT",
  fieldBaseTypes: {
    host: "String",
    sslEnabled: "Boolean",
    url: "URL",
  },
  implementsNode: false,
};
Object.freeze(Domain.fieldBaseTypes);
const Domain$1 = Object.freeze(Domain);

const ShopPolicy = {
  name: "ShopPolicy",
  kind: "OBJECT",
  fieldBaseTypes: {
    body: "String",
    id: "ID",
    title: "String",
    url: "URL",
  },
  implementsNode: true,
};
Object.freeze(ShopPolicy.fieldBaseTypes);
const ShopPolicy$1 = Object.freeze(ShopPolicy);

const CardBrand = {
  name: "CardBrand",
  kind: "ENUM",
};
const CardBrand$1 = Object.freeze(CardBrand);

const CountryCode = {
  name: "CountryCode",
  kind: "ENUM",
};
const CountryCode$1 = Object.freeze(CountryCode);

const DigitalWallet = {
  name: "DigitalWallet",
  kind: "ENUM",
};
const DigitalWallet$1 = Object.freeze(DigitalWallet);

const CollectionSortKeys = {
  name: "CollectionSortKeys",
  kind: "ENUM",
};
const CollectionSortKeys$1 = Object.freeze(CollectionSortKeys);

const ProductSortKeys = {
  name: "ProductSortKeys",
  kind: "ENUM",
};
const ProductSortKeys$1 = Object.freeze(ProductSortKeys);

const Mutation = {
  name: "Mutation",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkoutAttributesUpdate: "CheckoutAttributesUpdatePayload",
    checkoutCompleteFree: "CheckoutCompleteFreePayload",
    checkoutCompleteWithCreditCard: "CheckoutCompleteWithCreditCardPayload",
    checkoutCompleteWithTokenizedPayment:
      "CheckoutCompleteWithTokenizedPaymentPayload",
    checkoutCreate: "CheckoutCreatePayload",
    checkoutCustomerAssociate: "CheckoutCustomerAssociatePayload",
    checkoutCustomerDisassociate: "CheckoutCustomerDisassociatePayload",
    checkoutEmailUpdate: "CheckoutEmailUpdatePayload",
    checkoutDiscountCodeApply: "CheckoutDiscountCodeApplyPayload",
    checkoutDiscountCodeRemove: "CheckoutDiscountCodeRemovePayload",
    checkoutGiftCardApply: "CheckoutGiftCardApplyPayload",
    checkoutGiftCardRemove: "CheckoutGiftCardRemovePayload",
    checkoutLineItemsAdd: "CheckoutLineItemsAddPayload",
    checkoutLineItemsRemove: "CheckoutLineItemsRemovePayload",
    checkoutLineItemsUpdate: "CheckoutLineItemsUpdatePayload",
    checkoutShippingAddressUpdate: "CheckoutShippingAddressUpdatePayload",
    checkoutShippingLineUpdate: "CheckoutShippingLineUpdatePayload",
    customerAccessTokenCreate: "CustomerAccessTokenCreatePayload",
    customerAccessTokenDelete: "CustomerAccessTokenDeletePayload",
    customerAccessTokenRenew: "CustomerAccessTokenRenewPayload",
    customerActivate: "CustomerActivatePayload",
    customerAddressCreate: "CustomerAddressCreatePayload",
    customerAddressDelete: "CustomerAddressDeletePayload",
    customerAddressUpdate: "CustomerAddressUpdatePayload",
    customerDefaultAddressUpdate: "CustomerDefaultAddressUpdatePayload",
    customerCreate: "CustomerCreatePayload",
    customerRecover: "CustomerRecoverPayload",
    customerReset: "CustomerResetPayload",
    customerUpdate: "CustomerUpdatePayload",
  },
  implementsNode: false,
  relayInputObjectBaseTypes: {
    checkoutAttributesUpdate: "CheckoutAttributesUpdateInput",
    checkoutCreate: "CheckoutCreateInput",
    customerAccessTokenCreate: "CustomerAccessTokenCreateInput",
    customerActivate: "CustomerActivateInput",
    customerCreate: "CustomerCreateInput",
    customerReset: "CustomerResetInput",
  },
};
Object.freeze(Mutation.fieldBaseTypes);
Object.freeze(Mutation.relayInputObjectBaseTypes);
const Mutation$1 = Object.freeze(Mutation);

const CheckoutAttributesUpdatePayload = {
  name: "CheckoutAttributesUpdatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutAttributesUpdatePayload.fieldBaseTypes);
const CheckoutAttributesUpdatePayload$1 = Object.freeze(
  CheckoutAttributesUpdatePayload
);

const UserError = {
  name: "UserError",
  kind: "OBJECT",
  fieldBaseTypes: {
    field: "String",
    message: "String",
  },
  implementsNode: false,
};
Object.freeze(UserError.fieldBaseTypes);
const UserError$1 = Object.freeze(UserError);

const CheckoutAttributesUpdateInput = {
  name: "CheckoutAttributesUpdateInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    note: "String",
    customAttributes: "AttributeInput",
    allowPartialAddresses: "Boolean",
  },
};
Object.freeze(CheckoutAttributesUpdateInput.inputFieldBaseTypes);
const CheckoutAttributesUpdateInput$1 = Object.freeze(
  CheckoutAttributesUpdateInput
);

const AttributeInput = {
  name: "AttributeInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    key: "String",
    value: "String",
  },
};
Object.freeze(AttributeInput.inputFieldBaseTypes);
const AttributeInput$1 = Object.freeze(AttributeInput);

const CheckoutCompleteFreePayload = {
  name: "CheckoutCompleteFreePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutCompleteFreePayload.fieldBaseTypes);
const CheckoutCompleteFreePayload$1 = Object.freeze(
  CheckoutCompleteFreePayload
);

const CheckoutCompleteWithCreditCardPayload = {
  name: "CheckoutCompleteWithCreditCardPayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    payment: "Payment",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutCompleteWithCreditCardPayload.fieldBaseTypes);
const CheckoutCompleteWithCreditCardPayload$1 = Object.freeze(
  CheckoutCompleteWithCreditCardPayload
);

const PaymentSettings = {
  name: "PaymentSettings",
  kind: "OBJECT",
  fieldBaseTypes: {
    acceptedCardBrands: "CardBrand",
    cardVaultUrl: "URL",
    countryCode: "CountryCode",
    currencyCode: "CurrencyCode",
    shopifyPaymentsAccountId: "String",
    supportedDigitalWallets: "DigitalWallet",
  },
  implementsNode: false,
};
Object.freeze(PaymentSettings.fieldBaseTypes);
const PaymentSettings$1 = Object.freeze(PaymentSettings);

const Payment = {
  name: "Payment",
  kind: "OBJECT",
  fieldBaseTypes: {
    amount: "Money",
    billingAddress: "MailingAddress",
    checkout: "Checkout",
    creditCard: "CreditCard",
    errorMessage: "String",
    id: "ID",
    idempotencyKey: "String",
    ready: "Boolean",
    test: "Boolean",
    transaction: "Transaction",
  },
  implementsNode: true,
};
Object.freeze(Payment.fieldBaseTypes);
const Payment$1 = Object.freeze(Payment);

const CreditCard = {
  name: "CreditCard",
  kind: "OBJECT",
  fieldBaseTypes: {
    brand: "String",
    expiryMonth: "Int",
    expiryYear: "Int",
    firstDigits: "String",
    firstName: "String",
    lastDigits: "String",
    lastName: "String",
    maskedNumber: "String",
  },
  implementsNode: false,
};
Object.freeze(CreditCard.fieldBaseTypes);
const CreditCard$1 = Object.freeze(CreditCard);

const Transaction = {
  name: "Transaction",
  kind: "OBJECT",
  fieldBaseTypes: {
    amount: "Money",
    kind: "TransactionKind",
    status: "TransactionStatus",
    test: "Boolean",
  },
  implementsNode: false,
};
Object.freeze(Transaction.fieldBaseTypes);
const Transaction$1 = Object.freeze(Transaction);

const TransactionKind = {
  name: "TransactionKind",
  kind: "ENUM",
};
const TransactionKind$1 = Object.freeze(TransactionKind);

const TransactionStatus = {
  name: "TransactionStatus",
  kind: "ENUM",
};
const TransactionStatus$1 = Object.freeze(TransactionStatus);

const CreditCardPaymentInput = {
  name: "CreditCardPaymentInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    amount: "Money",
    idempotencyKey: "String",
    billingAddress: "MailingAddressInput",
    vaultId: "String",
    test: "Boolean",
  },
};
Object.freeze(CreditCardPaymentInput.inputFieldBaseTypes);
const CreditCardPaymentInput$1 = Object.freeze(CreditCardPaymentInput);

const MailingAddressInput = {
  name: "MailingAddressInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    address1: "String",
    address2: "String",
    city: "String",
    company: "String",
    country: "String",
    firstName: "String",
    lastName: "String",
    phone: "String",
    province: "String",
    zip: "String",
  },
};
Object.freeze(MailingAddressInput.inputFieldBaseTypes);
const MailingAddressInput$1 = Object.freeze(MailingAddressInput);

const CheckoutCompleteWithTokenizedPaymentPayload = {
  name: "CheckoutCompleteWithTokenizedPaymentPayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    payment: "Payment",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutCompleteWithTokenizedPaymentPayload.fieldBaseTypes);
const CheckoutCompleteWithTokenizedPaymentPayload$1 = Object.freeze(
  CheckoutCompleteWithTokenizedPaymentPayload
);

const TokenizedPaymentInput = {
  name: "TokenizedPaymentInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    amount: "Money",
    idempotencyKey: "String",
    billingAddress: "MailingAddressInput",
    type: "String",
    paymentData: "String",
    test: "Boolean",
    identifier: "String",
  },
};
Object.freeze(TokenizedPaymentInput.inputFieldBaseTypes);
const TokenizedPaymentInput$1 = Object.freeze(TokenizedPaymentInput);

const CheckoutCreatePayload = {
  name: "CheckoutCreatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutCreatePayload.fieldBaseTypes);
const CheckoutCreatePayload$1 = Object.freeze(CheckoutCreatePayload);

const CheckoutCreateInput = {
  name: "CheckoutCreateInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    email: "String",
    lineItems: "CheckoutLineItemInput",
    shippingAddress: "MailingAddressInput",
    note: "String",
    customAttributes: "AttributeInput",
    allowPartialAddresses: "Boolean",
  },
};
Object.freeze(CheckoutCreateInput.inputFieldBaseTypes);
const CheckoutCreateInput$1 = Object.freeze(CheckoutCreateInput);

const CheckoutLineItemInput = {
  name: "CheckoutLineItemInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    variantId: "ID",
    quantity: "Int",
    customAttributes: "AttributeInput",
  },
};
Object.freeze(CheckoutLineItemInput.inputFieldBaseTypes);
const CheckoutLineItemInput$1 = Object.freeze(CheckoutLineItemInput);

const CheckoutCustomerAssociatePayload = {
  name: "CheckoutCustomerAssociatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutCustomerAssociatePayload.fieldBaseTypes);
const CheckoutCustomerAssociatePayload$1 = Object.freeze(
  CheckoutCustomerAssociatePayload
);

const CheckoutCustomerDisassociatePayload = {
  name: "CheckoutCustomerDisassociatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutCustomerDisassociatePayload.fieldBaseTypes);
const CheckoutCustomerDisassociatePayload$1 = Object.freeze(
  CheckoutCustomerDisassociatePayload
);

const CheckoutEmailUpdatePayload = {
  name: "CheckoutEmailUpdatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutEmailUpdatePayload.fieldBaseTypes);
const CheckoutEmailUpdatePayload$1 = Object.freeze(CheckoutEmailUpdatePayload);

const CheckoutDiscountCodeApplyPayload = {
  name: "CheckoutDiscountCodeApplyPayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutDiscountCodeApplyPayload.fieldBaseTypes);
const CheckoutDiscountCodeApplyPayload$1 = Object.freeze(
  CheckoutDiscountCodeApplyPayload
);

const CheckoutDiscountCodeRemovePayload = {
  name: "CheckoutDiscountCodeRemovePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutDiscountCodeRemovePayload.fieldBaseTypes);
const CheckoutDiscountCodeRemovePayload$1 = Object.freeze(
  CheckoutDiscountCodeRemovePayload
);

const CheckoutGiftCardApplyPayload = {
  name: "CheckoutGiftCardApplyPayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutGiftCardApplyPayload.fieldBaseTypes);
const CheckoutGiftCardApplyPayload$1 = Object.freeze(
  CheckoutGiftCardApplyPayload
);

const CheckoutGiftCardRemovePayload = {
  name: "CheckoutGiftCardRemovePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutGiftCardRemovePayload.fieldBaseTypes);
const CheckoutGiftCardRemovePayload$1 = Object.freeze(
  CheckoutGiftCardRemovePayload
);

const CheckoutLineItemsAddPayload = {
  name: "CheckoutLineItemsAddPayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutLineItemsAddPayload.fieldBaseTypes);
const CheckoutLineItemsAddPayload$1 = Object.freeze(
  CheckoutLineItemsAddPayload
);

const CheckoutLineItemsRemovePayload = {
  name: "CheckoutLineItemsRemovePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutLineItemsRemovePayload.fieldBaseTypes);
const CheckoutLineItemsRemovePayload$1 = Object.freeze(
  CheckoutLineItemsRemovePayload
);

const CheckoutLineItemsUpdatePayload = {
  name: "CheckoutLineItemsUpdatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutLineItemsUpdatePayload.fieldBaseTypes);
const CheckoutLineItemsUpdatePayload$1 = Object.freeze(
  CheckoutLineItemsUpdatePayload
);

const CheckoutLineItemUpdateInput = {
  name: "CheckoutLineItemUpdateInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    id: "ID",
    variantId: "ID",
    quantity: "Int",
    customAttributes: "AttributeInput",
  },
};
Object.freeze(CheckoutLineItemUpdateInput.inputFieldBaseTypes);
const CheckoutLineItemUpdateInput$1 = Object.freeze(
  CheckoutLineItemUpdateInput
);

const CheckoutShippingAddressUpdatePayload = {
  name: "CheckoutShippingAddressUpdatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutShippingAddressUpdatePayload.fieldBaseTypes);
const CheckoutShippingAddressUpdatePayload$1 = Object.freeze(
  CheckoutShippingAddressUpdatePayload
);

const CheckoutShippingLineUpdatePayload = {
  name: "CheckoutShippingLineUpdatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    checkout: "Checkout",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CheckoutShippingLineUpdatePayload.fieldBaseTypes);
const CheckoutShippingLineUpdatePayload$1 = Object.freeze(
  CheckoutShippingLineUpdatePayload
);

const CustomerAccessTokenCreatePayload = {
  name: "CustomerAccessTokenCreatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    customerAccessToken: "CustomerAccessToken",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CustomerAccessTokenCreatePayload.fieldBaseTypes);
const CustomerAccessTokenCreatePayload$1 = Object.freeze(
  CustomerAccessTokenCreatePayload
);

const CustomerAccessToken = {
  name: "CustomerAccessToken",
  kind: "OBJECT",
  fieldBaseTypes: {
    accessToken: "String",
    expiresAt: "DateTime",
  },
  implementsNode: false,
};
Object.freeze(CustomerAccessToken.fieldBaseTypes);
const CustomerAccessToken$1 = Object.freeze(CustomerAccessToken);

const CustomerAccessTokenCreateInput = {
  name: "CustomerAccessTokenCreateInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    email: "String",
    password: "String",
  },
};
Object.freeze(CustomerAccessTokenCreateInput.inputFieldBaseTypes);
const CustomerAccessTokenCreateInput$1 = Object.freeze(
  CustomerAccessTokenCreateInput
);

const CustomerAccessTokenDeletePayload = {
  name: "CustomerAccessTokenDeletePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    deletedAccessToken: "String",
    deletedCustomerAccessTokenId: "String",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CustomerAccessTokenDeletePayload.fieldBaseTypes);
const CustomerAccessTokenDeletePayload$1 = Object.freeze(
  CustomerAccessTokenDeletePayload
);

const CustomerAccessTokenRenewPayload = {
  name: "CustomerAccessTokenRenewPayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    customerAccessToken: "CustomerAccessToken",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CustomerAccessTokenRenewPayload.fieldBaseTypes);
const CustomerAccessTokenRenewPayload$1 = Object.freeze(
  CustomerAccessTokenRenewPayload
);

const CustomerActivatePayload = {
  name: "CustomerActivatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    customer: "Customer",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CustomerActivatePayload.fieldBaseTypes);
const CustomerActivatePayload$1 = Object.freeze(CustomerActivatePayload);

const CustomerActivateInput = {
  name: "CustomerActivateInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    activationToken: "String",
    password: "String",
  },
};
Object.freeze(CustomerActivateInput.inputFieldBaseTypes);
const CustomerActivateInput$1 = Object.freeze(CustomerActivateInput);

const CustomerAddressCreatePayload = {
  name: "CustomerAddressCreatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    customerAddress: "MailingAddress",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CustomerAddressCreatePayload.fieldBaseTypes);
const CustomerAddressCreatePayload$1 = Object.freeze(
  CustomerAddressCreatePayload
);

const CustomerAddressDeletePayload = {
  name: "CustomerAddressDeletePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    deletedCustomerAddressId: "String",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CustomerAddressDeletePayload.fieldBaseTypes);
const CustomerAddressDeletePayload$1 = Object.freeze(
  CustomerAddressDeletePayload
);

const CustomerAddressUpdatePayload = {
  name: "CustomerAddressUpdatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    customerAddress: "MailingAddress",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CustomerAddressUpdatePayload.fieldBaseTypes);
const CustomerAddressUpdatePayload$1 = Object.freeze(
  CustomerAddressUpdatePayload
);

const CustomerDefaultAddressUpdatePayload = {
  name: "CustomerDefaultAddressUpdatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    customer: "Customer",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CustomerDefaultAddressUpdatePayload.fieldBaseTypes);
const CustomerDefaultAddressUpdatePayload$1 = Object.freeze(
  CustomerDefaultAddressUpdatePayload
);

const CustomerCreatePayload = {
  name: "CustomerCreatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    customer: "Customer",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CustomerCreatePayload.fieldBaseTypes);
const CustomerCreatePayload$1 = Object.freeze(CustomerCreatePayload);

const CustomerCreateInput = {
  name: "CustomerCreateInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    firstName: "String",
    lastName: "String",
    email: "String",
    password: "String",
    acceptsMarketing: "Boolean",
  },
};
Object.freeze(CustomerCreateInput.inputFieldBaseTypes);
const CustomerCreateInput$1 = Object.freeze(CustomerCreateInput);

const CustomerRecoverPayload = {
  name: "CustomerRecoverPayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CustomerRecoverPayload.fieldBaseTypes);
const CustomerRecoverPayload$1 = Object.freeze(CustomerRecoverPayload);

const CustomerResetPayload = {
  name: "CustomerResetPayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    customer: "Customer",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CustomerResetPayload.fieldBaseTypes);
const CustomerResetPayload$1 = Object.freeze(CustomerResetPayload);

const CustomerResetInput = {
  name: "CustomerResetInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    resetToken: "String",
    password: "String",
  },
};
Object.freeze(CustomerResetInput.inputFieldBaseTypes);
const CustomerResetInput$1 = Object.freeze(CustomerResetInput);

const CustomerUpdatePayload = {
  name: "CustomerUpdatePayload",
  kind: "OBJECT",
  fieldBaseTypes: {
    customer: "Customer",
    userErrors: "UserError",
  },
  implementsNode: false,
};
Object.freeze(CustomerUpdatePayload.fieldBaseTypes);
const CustomerUpdatePayload$1 = Object.freeze(CustomerUpdatePayload);

const CustomerUpdateInput = {
  name: "CustomerUpdateInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    firstName: "String",
    lastName: "String",
    email: "String",
    password: "String",
    acceptsMarketing: "Boolean",
  },
};
Object.freeze(CustomerUpdateInput.inputFieldBaseTypes);
const CustomerUpdateInput$1 = Object.freeze(CustomerUpdateInput);

const __Schema = {
  name: "__Schema",
  kind: "OBJECT",
  fieldBaseTypes: {
    directives: "__Directive",
    mutationType: "__Type",
    queryType: "__Type",
    subscriptionType: "__Type",
    types: "__Type",
  },
  implementsNode: false,
};
Object.freeze(__Schema.fieldBaseTypes);
const __Schema$1 = Object.freeze(__Schema);

const __Type = {
  name: "__Type",
  kind: "OBJECT",
  fieldBaseTypes: {
    description: "String",
    enumValues: "__EnumValue",
    fields: "__Field",
    inputFields: "__InputValue",
    interfaces: "__Type",
    kind: "__TypeKind",
    name: "String",
    ofType: "__Type",
    possibleTypes: "__Type",
  },
  implementsNode: false,
};
Object.freeze(__Type.fieldBaseTypes);
const __Type$1 = Object.freeze(__Type);

const __TypeKind = {
  name: "__TypeKind",
  kind: "ENUM",
};
const __TypeKind$1 = Object.freeze(__TypeKind);

const __Field = {
  name: "__Field",
  kind: "OBJECT",
  fieldBaseTypes: {
    args: "__InputValue",
    deprecationReason: "String",
    description: "String",
    isDeprecated: "Boolean",
    name: "String",
    type: "__Type",
  },
  implementsNode: false,
};
Object.freeze(__Field.fieldBaseTypes);
const __Field$1 = Object.freeze(__Field);

const __InputValue = {
  name: "__InputValue",
  kind: "OBJECT",
  fieldBaseTypes: {
    defaultValue: "String",
    description: "String",
    name: "String",
    type: "__Type",
  },
  implementsNode: false,
};
Object.freeze(__InputValue.fieldBaseTypes);
const __InputValue$1 = Object.freeze(__InputValue);

const __EnumValue = {
  name: "__EnumValue",
  kind: "OBJECT",
  fieldBaseTypes: {
    deprecationReason: "String",
    description: "String",
    isDeprecated: "Boolean",
    name: "String",
  },
  implementsNode: false,
};
Object.freeze(__EnumValue.fieldBaseTypes);
const __EnumValue$1 = Object.freeze(__EnumValue);

const __Directive = {
  name: "__Directive",
  kind: "OBJECT",
  fieldBaseTypes: {
    args: "__InputValue",
    description: "String",
    locations: "__DirectiveLocation",
    name: "String",
    onField: "Boolean",
    onFragment: "Boolean",
    onOperation: "Boolean",
  },
  implementsNode: false,
};
Object.freeze(__Directive.fieldBaseTypes);
const __Directive$1 = Object.freeze(__Directive);

const __DirectiveLocation = {
  name: "__DirectiveLocation",
  kind: "ENUM",
};
const __DirectiveLocation$1 = Object.freeze(__DirectiveLocation);

const Types = {
  types: {},
};
Types.types.Checkout = Checkout$1;
Types.types.ID = ID$1;
Types.types.Boolean = Boolean$1;
Types.types.CheckoutLineItemConnection = CheckoutLineItemConnection$1;
Types.types.PageInfo = PageInfo$1;
Types.types.CheckoutLineItemEdge = CheckoutLineItemEdge$1;
Types.types.String = String$1;
Types.types.CheckoutLineItem = CheckoutLineItem$1;
Types.types.ProductVariant = ProductVariant$1;
Types.types.Float = Float$1;
Types.types.WeightUnit = WeightUnit$1;
Types.types.Money = Money$1;
Types.types.Image = Image$1;
Types.types.URL = URL$1;
Types.types.Int = Int$1;
Types.types.CropRegion = CropRegion$1;
Types.types.SelectedOption = SelectedOption$1;
Types.types.Product = Product$1;
Types.types.CollectionConnection = CollectionConnection$1;
Types.types.CollectionEdge = CollectionEdge$1;
Types.types.Collection = Collection$1;
Types.types.ArticleConnection = ArticleConnection$1;
Types.types.ArticleEdge = ArticleEdge$1;
Types.types.Article = Article$1;
Types.types.ArticleAuthor = ArticleAuthor$1;
Types.types.HTML = HTML$1;
Types.types.DateTime = DateTime$1;
Types.types.ProductConnection = ProductConnection$1;
Types.types.ProductEdge = ProductEdge$1;
Types.types.Node = Node$1;
Types.types.ImageConnection = ImageConnection$1;
Types.types.ImageEdge = ImageEdge$1;
Types.types.SelectedOptionInput = SelectedOptionInput$1;
Types.types.ProductOption = ProductOption$1;
Types.types.ProductVariantConnection = ProductVariantConnection$1;
Types.types.ProductVariantEdge = ProductVariantEdge$1;
Types.types.Attribute = Attribute$1;
Types.types.MailingAddress = MailingAddress$1;
Types.types.ShippingRate = ShippingRate$1;
Types.types.AvailableShippingRates = AvailableShippingRates$1;
Types.types.Customer = Customer$1;
Types.types.MailingAddressConnection = MailingAddressConnection$1;
Types.types.MailingAddressEdge = MailingAddressEdge$1;
Types.types.OrderConnection = OrderConnection$1;
Types.types.OrderEdge = OrderEdge$1;
Types.types.Order = Order$1;
Types.types.OrderCancelReason = OrderCancelReason$1;
Types.types.CurrencyCode = CurrencyCode$1;
Types.types.OrderDisplayFulfillmentStatus = OrderDisplayFulfillmentStatus$1;
Types.types.OrderDisplayFinancialStatus = OrderDisplayFinancialStatus$1;
Types.types.OrderLineItemConnection = OrderLineItemConnection$1;
Types.types.OrderLineItemEdge = OrderLineItemEdge$1;
Types.types.OrderLineItem = OrderLineItem$1;
Types.types.OrderSortKeys = OrderSortKeys$1;
Types.types.AppliedGiftCard = AppliedGiftCard$1;
Types.types.QueryRoot = QueryRoot$1;
Types.types.Shop = Shop$1;
Types.types.Domain = Domain$1;
Types.types.PaymentSettings = PaymentSettings$1;
Types.types.CardBrand = CardBrand$1;
Types.types.CountryCode = CountryCode$1;
Types.types.DigitalWallet = DigitalWallet$1;
Types.types.ShopPolicy = ShopPolicy$1;
Types.types.CollectionSortKeys = CollectionSortKeys$1;
Types.types.ProductSortKeys = ProductSortKeys$1;
Types.types.Mutation = Mutation$1;
Types.types.CheckoutAttributesUpdatePayload = CheckoutAttributesUpdatePayload$1;
Types.types.UserError = UserError$1;
Types.types.CheckoutAttributesUpdateInput = CheckoutAttributesUpdateInput$1;
Types.types.AttributeInput = AttributeInput$1;
Types.types.CheckoutCompleteFreePayload = CheckoutCompleteFreePayload$1;
Types.types.CheckoutCompleteWithCreditCardPayload = CheckoutCompleteWithCreditCardPayload$1;
Types.types.Payment = Payment$1;
Types.types.CreditCard = CreditCard$1;
Types.types.Transaction = Transaction$1;
Types.types.TransactionKind = TransactionKind$1;
Types.types.TransactionStatus = TransactionStatus$1;
Types.types.CreditCardPaymentInput = CreditCardPaymentInput$1;
Types.types.MailingAddressInput = MailingAddressInput$1;
Types.types.CheckoutCompleteWithTokenizedPaymentPayload = CheckoutCompleteWithTokenizedPaymentPayload$1;
Types.types.TokenizedPaymentInput = TokenizedPaymentInput$1;
Types.types.CheckoutCreatePayload = CheckoutCreatePayload$1;
Types.types.CheckoutCreateInput = CheckoutCreateInput$1;
Types.types.CheckoutLineItemInput = CheckoutLineItemInput$1;
Types.types.CheckoutCustomerAssociatePayload = CheckoutCustomerAssociatePayload$1;
Types.types.CheckoutCustomerDisassociatePayload = CheckoutCustomerDisassociatePayload$1;
Types.types.CheckoutEmailUpdatePayload = CheckoutEmailUpdatePayload$1;
Types.types.CheckoutDiscountCodeApplyPayload = CheckoutDiscountCodeApplyPayload$1;
Types.types.CheckoutDiscountCodeRemovePayload = CheckoutDiscountCodeRemovePayload$1;
Types.types.CheckoutGiftCardApplyPayload = CheckoutGiftCardApplyPayload$1;
Types.types.CheckoutGiftCardRemovePayload = CheckoutGiftCardRemovePayload$1;
Types.types.CheckoutLineItemsAddPayload = CheckoutLineItemsAddPayload$1;
Types.types.CheckoutLineItemsRemovePayload = CheckoutLineItemsRemovePayload$1;
Types.types.CheckoutLineItemsUpdatePayload = CheckoutLineItemsUpdatePayload$1;
Types.types.CheckoutLineItemUpdateInput = CheckoutLineItemUpdateInput$1;
Types.types.CheckoutShippingAddressUpdatePayload = CheckoutShippingAddressUpdatePayload$1;
Types.types.CheckoutShippingLineUpdatePayload = CheckoutShippingLineUpdatePayload$1;
Types.types.CustomerAccessTokenCreatePayload = CustomerAccessTokenCreatePayload$1;
Types.types.CustomerAccessToken = CustomerAccessToken$1;
Types.types.CustomerAccessTokenCreateInput = CustomerAccessTokenCreateInput$1;
Types.types.CustomerAccessTokenDeletePayload = CustomerAccessTokenDeletePayload$1;
Types.types.CustomerAccessTokenRenewPayload = CustomerAccessTokenRenewPayload$1;
Types.types.CustomerActivatePayload = CustomerActivatePayload$1;
Types.types.CustomerActivateInput = CustomerActivateInput$1;
Types.types.CustomerAddressCreatePayload = CustomerAddressCreatePayload$1;
Types.types.CustomerAddressDeletePayload = CustomerAddressDeletePayload$1;
Types.types.CustomerAddressUpdatePayload = CustomerAddressUpdatePayload$1;
Types.types.CustomerDefaultAddressUpdatePayload = CustomerDefaultAddressUpdatePayload$1;
Types.types.CustomerCreatePayload = CustomerCreatePayload$1;
Types.types.CustomerCreateInput = CustomerCreateInput$1;
Types.types.CustomerRecoverPayload = CustomerRecoverPayload$1;
Types.types.CustomerResetPayload = CustomerResetPayload$1;
Types.types.CustomerResetInput = CustomerResetInput$1;
Types.types.CustomerUpdatePayload = CustomerUpdatePayload$1;
Types.types.CustomerUpdateInput = CustomerUpdateInput$1;
Types.types.__Schema = __Schema$1;
Types.types.__Type = __Type$1;
Types.types.__TypeKind = __TypeKind$1;
Types.types.__Field = __Field$1;
Types.types.__InputValue = __InputValue$1;
Types.types.__EnumValue = __EnumValue$1;
Types.types.__Directive = __Directive$1;
Types.types.__DirectiveLocation = __DirectiveLocation$1;
Types.queryType = "QueryRoot";
Types.mutationType = "Mutation";
Types.subscriptionType = null;
Object.freeze(Types.types);
const types = Object.freeze(Types);

export default types;
