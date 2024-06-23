// Types/ClientType.ts

export interface AddressClient {
  nr: number;
  street: string;
  neighborhood: string;
  city: string;
}

export interface Client {
  clientID: string;
  firstname: string;
  lastName: string;
  cin: string;
  phoneNumber: string;
  email: string;
  address: AddressClient;
}

export interface CreateClient {
  firstname: string;
  lastName: string;
  cin: string;
  phoneNumber: string;
  email: string;
  address: AddressClient;
}
