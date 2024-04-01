import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: any[] = [
    {id: 1, name: 'PUMA Smash Vulc Canvas Shoes', category: 'Unisex', price: 3400, quantity: 5},
    {id: 2, name: 'Nike Downshifter 13 Running Shoes - Platinum Violet', category: 'Womens', price: 2460, quantity: 10}
  ]

  constructor() { }

  addToCart(item:any){
    this.cartItems.push(item)
  }

  removeFromCart(item:any){
    const index = this.cartItems.indexOf(item)
    if(index !== -1){
      this.cartItems.splice(index,1)
    }
  }
  updateQuantity(item:any, quantity: number){
    const index = this.cartItems.indexOf(item)
    if(index !== -1){
      this.cartItems[index].quantity = quantity
    }
  }
  getCartItems(){
    return this.cartItems
  }

  clearCart(){
    this.cartItems = []
  }
}
