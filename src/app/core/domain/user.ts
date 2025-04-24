export interface User {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  role: Role,
  password: string
}

export enum Role {
  ADMIN = "ADMIN",
  SUBSCRIBER = "SUBSCRIBER"
}
