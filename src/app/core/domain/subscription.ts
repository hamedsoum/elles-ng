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

export interface SubscriptionResponse {
  id: string;
  productName: string,
  insuredFirstName: string,
  insuredLastName: string,
  phoneNumber: string,
  identityNumber: string,
  vehicleCategory: string,
  licenceNumber: string,
  vehicleFirstRegistrationDate: string,
  status: string
}

export enum SubscriptionStatus {
  DRAFT  = "DRAFT",
  VALIDATED = "VALIDATED",
  CANCELLED = "CANCELLED"
}
