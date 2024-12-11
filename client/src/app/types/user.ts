import { Animals } from './animal';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAnimals?: Animals[];
  likedAnimals?: Animals[];
}

export interface UserWithToken extends User {
  token: string;
}

export interface UserFromStorage {
  _id: string;
  firstName: string;
  email: string;
}
