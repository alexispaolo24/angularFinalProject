import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(private cartService: CartService){}

  get cartItems(){
    return this.cartService.getCartItems()
  }

  removeFromCart(item:any){
    this.cartService.removeFromCart(item)
  }
  updateQuatity(item:any, quantity:number){
    this.cartService.updateQuantity(item,quantity)
  }
}