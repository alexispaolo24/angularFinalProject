import { CartItem } from "./cartItem";


export interface Cart {
    userId: string;
    items: CartItem[];
  }