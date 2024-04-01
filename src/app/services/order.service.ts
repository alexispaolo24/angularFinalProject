import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  getPendingOrders() {
    return [
      {
        id: 2495, items: [
          { id: 1, name: 'PUMA Smash Vulc Canvas Shoes', category: 'Unisex', price: 3400, quantity: 5 },
          { id: 2, name: 'Nike Downshifter 13 Running Shoes - Platinum Violet', category: 'Womens', price: 2460, quantity: 10 }],
          totalQuantity: 15,
          totalPrice: 41600
      }
    ]
  }
}
