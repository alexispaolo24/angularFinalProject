import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: any[] = [
    {id: 1, name: 'PUMA Smash Vulc Canvas Shoes', category: 'Unisex', price: 3400, quantity: 5},
    {id: 2, name: 'Nike Downshifter 13 Running Shoes - Platinum Violet', category: 'Womens', price: 2460, quantity: 10}
  ]

  private serverUrl = 'http://localhost:3000'; // Your API endpoint

  constructor(private http: HttpClient) { }

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

  createEmptyCart(userId: string): Observable<any> {
    const emptyCart = { userId, items: [] }; // Create an empty cart object
    return this.http.post(`${this.serverUrl}/carts`, emptyCart).pipe(
      tap(() => {
        console.log('Empty cart created for user:', userId);
      }),
      catchError(error => {
        console.error('Error creating empty cart:', error);
        return throwError('Failed to create empty cart for user');
      })
    );
  }
}