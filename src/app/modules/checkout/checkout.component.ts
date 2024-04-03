import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  cartItems: any[] = []

  constructor(private cartService:CartService){
    this.cartItems = this.cartService.getCartItems();
  }

  getTotalPrice(){
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity),0)
  }

  getTotalQuantity(){
    return this.cartItems.reduce((total,item) => total + item.quantity,0)
  }

  submitTransaction(){
    console.log('Transaction submitted. Status changed to pending')
  }
}