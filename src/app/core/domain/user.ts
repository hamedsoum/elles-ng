export interface User {
  id: string;
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  role: {id: string, libelle: string},
  password: string
}

export enum Role {
  ADMIN = "ADMIN",
  AMAZON = "AMAZON"
}
