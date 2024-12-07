import { User } from "./user";

export interface Animals {
  _id: string;
  name: string;             
  type: 'Dog' | 'Cat' | 'Other'; 
  age: 'Young' | 'Adult' | 'Senior';
  size: 'Small' | 'Medium' | 'Large'; 
  gender: 'Male' | 'Female'; 
  specialNeeds: 'Yes' | 'No'; 
  location: string;         
  image: string;           
  description: string;       
  owner: User;         
  likes: [];       
  status: 'Adopt' | 'Lost' | 'Found';
  createdAt: string;         
  updatedAt: string;
};