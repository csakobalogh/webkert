import { CartItem } from './CartItem';

export interface User {
    name: {
      firstname: string;
      lastname: string;
    };
    email: string;
    password: string;
    cartItems: CartItem[]; 
  }