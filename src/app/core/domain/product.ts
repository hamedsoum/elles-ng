export interface Product {
  id: string,
  name: string,
  warranties: string[],
  eligibleVehicles: string[]
}

export enum Warranty {
    RC = "RC",
    DOMMAGE = "DOMMAGE",
    VOL = "VOL",
    TIERCE_COLLISION = "TIERCE COLLISION",
    COLLISION = "COLLISION",
    INCENDIE = "INCENDIE",
    "All" = "All",
}
