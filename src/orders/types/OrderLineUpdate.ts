/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderLineInput, OrderErrorCode, AddressTypeEnum, OrderDiscountType, DiscountValueTypeEnum, OrderEventsEmailsEnum, OrderEventsEnum, FulfillmentStatus, PaymentChargeStatusEnum, OrderAction, OrderPaymentStatusEnum, OrderStatus, JobStatusEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: OrderLineUpdate
// ====================================================

export interface OrderLineUpdate_orderLineUpdate_errors {
  __typename: "OrderError";
  code: OrderErrorCode;
  field: string | null;
  addressType: AddressTypeEnum | null;
}

export interface OrderLineUpdate_orderLineUpdate_order_metadata {
  __typename: "MetadataItem";
  key: string;
  value: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_privateMetadata {
  __typename: "MetadataItem";
  key: string;
  value: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_billingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  country: OrderLineUpdate_orderLineUpdate_order_billingAddress_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_discounts_amount {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_discounts {
  __typename: "OrderDiscount";
  id: string;
  type: OrderDiscountType;
  calculationMode: DiscountValueTypeEnum;
  value: any;
  reason: string | null;
  amount: OrderLineUpdate_orderLineUpdate_order_discounts_amount;
}

export interface OrderLineUpdate_orderLineUpdate_order_events_discount_amount {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_events_discount_oldAmount {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_events_discount {
  __typename: "OrderEventDiscountObject";
  valueType: DiscountValueTypeEnum;
  value: any;
  reason: string | null;
  amount: OrderLineUpdate_orderLineUpdate_order_events_discount_amount | null;
  oldValueType: DiscountValueTypeEnum | null;
  oldValue: any | null;
  oldAmount: OrderLineUpdate_orderLineUpdate_order_events_discount_oldAmount | null;
}

export interface OrderLineUpdate_orderLineUpdate_order_events_relatedOrder {
  __typename: "Order";
  id: string;
  number: string | null;
}

export interface OrderLineUpdate_orderLineUpdate_order_events_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_events_app {
  __typename: "App";
  id: string;
  name: string | null;
  appUrl: string | null;
}

export interface OrderLineUpdate_orderLineUpdate_order_events_lines_discount_amount {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_events_lines_discount_oldAmount {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_events_lines_discount {
  __typename: "OrderEventDiscountObject";
  valueType: DiscountValueTypeEnum;
  value: any;
  reason: string | null;
  amount: OrderLineUpdate_orderLineUpdate_order_events_lines_discount_amount | null;
  oldValueType: DiscountValueTypeEnum | null;
  oldValue: any | null;
  oldAmount: OrderLineUpdate_orderLineUpdate_order_events_lines_discount_oldAmount | null;
}

export interface OrderLineUpdate_orderLineUpdate_order_events_lines_orderLine {
  __typename: "OrderLine";
  id: string;
  productName: string;
  variantName: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_events_lines {
  __typename: "OrderEventOrderLineObject";
  quantity: number | null;
  itemName: string | null;
  discount: OrderLineUpdate_orderLineUpdate_order_events_lines_discount | null;
  orderLine: OrderLineUpdate_orderLineUpdate_order_events_lines_orderLine | null;
}

export interface OrderLineUpdate_orderLineUpdate_order_events {
  __typename: "OrderEvent";
  id: string;
  amount: number | null;
  shippingCostsIncluded: boolean | null;
  date: any | null;
  email: string | null;
  emailType: OrderEventsEmailsEnum | null;
  invoiceNumber: string | null;
  discount: OrderLineUpdate_orderLineUpdate_order_events_discount | null;
  relatedOrder: OrderLineUpdate_orderLineUpdate_order_events_relatedOrder | null;
  message: string | null;
  pspReference: string | null;
  grapqhlPaymentId: string | null;
  paymentGateway: string | null;
  quantity: number | null;
  transactionReference: string | null;
  type: OrderEventsEnum | null;
  user: OrderLineUpdate_orderLineUpdate_order_events_user | null;
  app: OrderLineUpdate_orderLineUpdate_order_events_app | null;
  lines: (OrderLineUpdate_orderLineUpdate_order_events_lines | null)[] | null;
}

export interface OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_variant {
  __typename: "ProductVariant";
  id: string;
  quantityAvailable: number;
}

export interface OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_unitDiscount {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_undiscountedUnitPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_undiscountedUnitPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_undiscountedUnitPrice {
  __typename: "TaxedMoney";
  currency: string;
  gross: OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_undiscountedUnitPrice_gross;
  net: OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_undiscountedUnitPrice_net;
}

export interface OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_unitPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_unitPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_unitPrice {
  __typename: "TaxedMoney";
  gross: OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_unitPrice_gross;
  net: OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_unitPrice_net;
}

export interface OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_thumbnail {
  __typename: "Image";
  url: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine {
  __typename: "OrderLine";
  id: string;
  isShippingRequired: boolean;
  variant: OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_variant | null;
  productName: string;
  productSku: string;
  quantity: number;
  quantityFulfilled: number;
  unitDiscount: OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_unitDiscount;
  unitDiscountValue: any;
  unitDiscountReason: string | null;
  unitDiscountType: DiscountValueTypeEnum | null;
  undiscountedUnitPrice: OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_undiscountedUnitPrice;
  unitPrice: OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_unitPrice;
  thumbnail: OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine_thumbnail | null;
}

export interface OrderLineUpdate_orderLineUpdate_order_fulfillments_lines {
  __typename: "FulfillmentLine";
  id: string;
  quantity: number;
  orderLine: OrderLineUpdate_orderLineUpdate_order_fulfillments_lines_orderLine | null;
}

export interface OrderLineUpdate_orderLineUpdate_order_fulfillments_warehouse {
  __typename: "Warehouse";
  id: string;
  name: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_fulfillments {
  __typename: "Fulfillment";
  id: string;
  lines: (OrderLineUpdate_orderLineUpdate_order_fulfillments_lines | null)[] | null;
  fulfillmentOrder: number;
  status: FulfillmentStatus;
  trackingNumber: string;
  warehouse: OrderLineUpdate_orderLineUpdate_order_fulfillments_warehouse | null;
}

export interface OrderLineUpdate_orderLineUpdate_order_lines_variant {
  __typename: "ProductVariant";
  id: string;
  quantityAvailable: number;
}

export interface OrderLineUpdate_orderLineUpdate_order_lines_unitDiscount {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_lines_undiscountedUnitPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_lines_undiscountedUnitPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_lines_undiscountedUnitPrice {
  __typename: "TaxedMoney";
  currency: string;
  gross: OrderLineUpdate_orderLineUpdate_order_lines_undiscountedUnitPrice_gross;
  net: OrderLineUpdate_orderLineUpdate_order_lines_undiscountedUnitPrice_net;
}

export interface OrderLineUpdate_orderLineUpdate_order_lines_unitPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_lines_unitPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_lines_unitPrice {
  __typename: "TaxedMoney";
  gross: OrderLineUpdate_orderLineUpdate_order_lines_unitPrice_gross;
  net: OrderLineUpdate_orderLineUpdate_order_lines_unitPrice_net;
}

export interface OrderLineUpdate_orderLineUpdate_order_lines_thumbnail {
  __typename: "Image";
  url: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_lines {
  __typename: "OrderLine";
  id: string;
  isShippingRequired: boolean;
  variant: OrderLineUpdate_orderLineUpdate_order_lines_variant | null;
  productName: string;
  productSku: string;
  quantity: number;
  quantityFulfilled: number;
  unitDiscount: OrderLineUpdate_orderLineUpdate_order_lines_unitDiscount;
  unitDiscountValue: any;
  unitDiscountReason: string | null;
  unitDiscountType: DiscountValueTypeEnum | null;
  undiscountedUnitPrice: OrderLineUpdate_orderLineUpdate_order_lines_undiscountedUnitPrice;
  unitPrice: OrderLineUpdate_orderLineUpdate_order_lines_unitPrice;
  thumbnail: OrderLineUpdate_orderLineUpdate_order_lines_thumbnail | null;
}

export interface OrderLineUpdate_orderLineUpdate_order_payments_total {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_payments_capturedAmount {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_payments_availableCaptureAmount {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_payments_availableRefundAmount {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_payments {
  __typename: "Payment";
  id: string;
  total: OrderLineUpdate_orderLineUpdate_order_payments_total | null;
  capturedAmount: OrderLineUpdate_orderLineUpdate_order_payments_capturedAmount | null;
  gatewayName: string;
  availableCaptureAmount: OrderLineUpdate_orderLineUpdate_order_payments_availableCaptureAmount | null;
  availableRefundAmount: OrderLineUpdate_orderLineUpdate_order_payments_availableRefundAmount | null;
  pspReference: string | null;
  chargeStatus: PaymentChargeStatusEnum;
  actions: (OrderAction | null)[];
}

export interface OrderLineUpdate_orderLineUpdate_order_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_shippingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  country: OrderLineUpdate_orderLineUpdate_order_shippingAddress_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_shippingPrice {
  __typename: "TaxedMoney";
  gross: OrderLineUpdate_orderLineUpdate_order_shippingPrice_gross;
}

export interface OrderLineUpdate_orderLineUpdate_order_subtotal_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_subtotal_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_subtotal {
  __typename: "TaxedMoney";
  gross: OrderLineUpdate_orderLineUpdate_order_subtotal_gross;
  net: OrderLineUpdate_orderLineUpdate_order_subtotal_net;
}

export interface OrderLineUpdate_orderLineUpdate_order_total_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_total_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_total_tax {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_total {
  __typename: "TaxedMoney";
  gross: OrderLineUpdate_orderLineUpdate_order_total_gross;
  net: OrderLineUpdate_orderLineUpdate_order_total_net;
  tax: OrderLineUpdate_orderLineUpdate_order_total_tax;
}

export interface OrderLineUpdate_orderLineUpdate_order_totalAuthorized {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_totalCaptured {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_undiscountedTotal_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_undiscountedTotal_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_undiscountedTotal {
  __typename: "TaxedMoney";
  net: OrderLineUpdate_orderLineUpdate_order_undiscountedTotal_net;
  gross: OrderLineUpdate_orderLineUpdate_order_undiscountedTotal_gross;
}

export interface OrderLineUpdate_orderLineUpdate_order_user {
  __typename: "User";
  id: string;
  email: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_shippingMethods_price {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_orderLineUpdate_order_shippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: OrderLineUpdate_orderLineUpdate_order_shippingMethods_price;
  active: boolean;
  message: string | null;
}

export interface OrderLineUpdate_orderLineUpdate_order_invoices {
  __typename: "Invoice";
  id: string;
  number: string | null;
  createdAt: any;
  url: string | null;
  status: JobStatusEnum;
}

export interface OrderLineUpdate_orderLineUpdate_order_channel {
  __typename: "Channel";
  isActive: boolean;
  id: string;
  name: string;
  currencyCode: string;
  slug: string;
}

export interface OrderLineUpdate_orderLineUpdate_order {
  __typename: "Order";
  id: string;
  metadata: (OrderLineUpdate_orderLineUpdate_order_metadata | null)[];
  privateMetadata: (OrderLineUpdate_orderLineUpdate_order_privateMetadata | null)[];
  billingAddress: OrderLineUpdate_orderLineUpdate_order_billingAddress | null;
  isShippingRequired: boolean;
  canFinalize: boolean;
  created: any;
  customerNote: string;
  discounts: OrderLineUpdate_orderLineUpdate_order_discounts[] | null;
  events: (OrderLineUpdate_orderLineUpdate_order_events | null)[] | null;
  fulfillments: (OrderLineUpdate_orderLineUpdate_order_fulfillments | null)[];
  lines: (OrderLineUpdate_orderLineUpdate_order_lines | null)[];
  number: string | null;
  payments: (OrderLineUpdate_orderLineUpdate_order_payments | null)[] | null;
  paymentStatus: OrderPaymentStatusEnum;
  shippingAddress: OrderLineUpdate_orderLineUpdate_order_shippingAddress | null;
  shippingMethod: OrderLineUpdate_orderLineUpdate_order_shippingMethod | null;
  shippingMethodName: string | null;
  shippingPrice: OrderLineUpdate_orderLineUpdate_order_shippingPrice;
  status: OrderStatus;
  subtotal: OrderLineUpdate_orderLineUpdate_order_subtotal;
  total: OrderLineUpdate_orderLineUpdate_order_total;
  actions: (OrderAction | null)[];
  totalAuthorized: OrderLineUpdate_orderLineUpdate_order_totalAuthorized;
  totalCaptured: OrderLineUpdate_orderLineUpdate_order_totalCaptured;
  undiscountedTotal: OrderLineUpdate_orderLineUpdate_order_undiscountedTotal;
  user: OrderLineUpdate_orderLineUpdate_order_user | null;
  userEmail: string | null;
  shippingMethods: OrderLineUpdate_orderLineUpdate_order_shippingMethods[];
  invoices: (OrderLineUpdate_orderLineUpdate_order_invoices | null)[] | null;
  channel: OrderLineUpdate_orderLineUpdate_order_channel;
  isPaid: boolean;
}

export interface OrderLineUpdate_orderLineUpdate {
  __typename: "OrderLineUpdate";
  errors: OrderLineUpdate_orderLineUpdate_errors[];
  order: OrderLineUpdate_orderLineUpdate_order | null;
}

export interface OrderLineUpdate {
  orderLineUpdate: OrderLineUpdate_orderLineUpdate | null;
}

export interface OrderLineUpdateVariables {
  id: string;
  input: OrderLineInput;
}
