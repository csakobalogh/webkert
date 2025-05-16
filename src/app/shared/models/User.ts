import { CartItem } from './CartItem';

export interface User {
  id: string;
    name: {
      firstname: string;
      lastname: string;
    };
    email: string;
    password: string;
    cartItems: CartItem[]; 
  }