import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products:any[] = []

  constructor(private productService: ProductService){
    this.products = this.productService.getProducts()
  }

  addProduct(product: any){
    this.productService.addProduct(product)
    this.products = this.productService.getProducts()
  }

  editProduct(productId:number, product:any){
    this.productService.updateProduct(productId,product)
    this.products = this.productService.getProducts()
  }

  deleteProduct(productId:number){
    this.productService.deleteProduct(productId)
    this.products = this.productService.getProducts()
  }
}
