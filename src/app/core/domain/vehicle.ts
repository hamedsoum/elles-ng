
export interface Vehicle {
  id: string,
  vehicleFirstRegistrationDate: string,
  licenceNumber: string,
  color: string,
  numberOfSeat: number,
  numberOfDoor: number,
  category: VehicleCategory
}


export enum VehicleCategory {
  CATEGORY_201 = "CATEGORY_201",
  CATEGORY_202 = "CATEGORY_202",
  CATEGORY_203 = "CATEGORY_202",
  CATEGORY_204 = "CATEGORY_202",
}
