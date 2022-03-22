export interface AddUser {
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface User {
  username: string;
  id: number;
}

export interface ServiceResponse {
  code: number;
  message?: {
    error: string;
  }
}

export interface Login {
  username: string;
  password: string;
}

export interface AddProduct {
  name: string;
  amount: string;
}

export interface AddOrder {
  products: number[];
}

export interface UserJwt {
  id: number;
  username: string;
  iat: number;
  exp: number;
}