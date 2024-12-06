import { Animals } from "./animal";

export interface User {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  createdAnimals?: Animals[],
  likedAnimals?: Animals[],
}

export interface AuthUser {
  _id: string,
  firstName: string,
  createdAnimals?: Animals[],
  likedAnimals?: Animals[],
}