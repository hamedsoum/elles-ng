
export interface Subscription {

  id: string,
  productID: string,
  insured: {

},
  vehicle: {

},
  status: SubscriptionStatus,
  createdAt: string,
  createdBy: string,
  updatedAt: string,
  updatedBy: string
}

export enum SubscriptionStatus {
  DRAFT  = "DRAFT",
  VALIDATED = "VALIDATED",
  CANCELLED = "CANCELLED"
}
