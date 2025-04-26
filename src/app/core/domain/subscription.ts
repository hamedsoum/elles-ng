import {Insured} from './insured';
import {Vehicle} from './vehicle';

export interface Subscription {
  id?: string,
  productID: string,
  insured: Insured,
  vehicle: Vehicle,
  status: SubscriptionStatus,
  createdAt: string,
  createdBy: string,
  updatedAt?: string,
  updatedBy?: string
}

export enum SubscriptionStatus {
  DRAFT  = "DRAFT",
  VALIDATED = "VALIDATED",
  CANCELLED = "CANCELLED"
}
