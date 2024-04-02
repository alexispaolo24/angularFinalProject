import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addProduct(): void {
    const newProduct: Product = {
      name: '',
      category: '',
      price: 0,
      quantity: 0,
      sales: 0
    };
    this.productService.addProduct(newProduct).subscribe(() => {
      this.getProducts();
    });
  }

  editProduct(product: Product): void {
    if (product.id !== undefined) {
      this.productService.updateProduct(product.id, product).subscribe(() => {
        this.getProducts();
      });
    } else {
      console.error('Product ID is undefined.');
    }
  }

  deleteProduct(productId: number): void {
    if (productId !== undefined) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.getProducts();
      });
    } else {
      console.error('Product ID is undefined.');
    }
  }
}
