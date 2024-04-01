import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: any[] = [
    { id: 1, name: 'PUMA Smash Vulc Canvas Shoes', category: 'Unisex', price: 3400, quantity: 0, sales: 50 },
    { id: 2, name: 'Nike Downshifter 13 Running Shoes - Platinum Violet', category: 'Womens', price: 2460, quantity: 0, sales: 40 },
    { id: 3, name: 'Adidas Lifestyle NY 90 White', category: 'Mens', price: 5130, quantity: 0, sales: 30 },
    { id: 4, name: 'Design Loafer Shoes', category: 'Womens', price: 133, quantity: 0, sales: 20 },
    { id: 5, name: 'Nike Legend Essential 3 Nature Workout Shoes', category: 'Womens', price: 2670, quantity: 0, sales: 10 }
  ]

  getProducts() {
    return [...this.products]
  }

  addProduct(product: any){
    this.products.push(product)
  }

  updateProduct(productId:number, updatedProduct: any){
    const index = this.products.findIndex(product => product.id === productId)
    if(index !== -1){
      this.products[index] = updatedProduct
    }
  }

  deleteProduct(productId:number){
    this.products = this.products.filter(product => product.id !==productId)
  }
}
