import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component'; // Assuming you have an EditProductComponent for the edit form dialog
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog // Inject MatDialog here
  ) { }

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

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(newProduct => {
      if (newProduct) {
        this.addProduct(newProduct); // Call addProduct method with new product data
      }
    });
  }

  addProduct(newProduct: Product): void {
    this.productService.addProduct(newProduct).subscribe(() => {
      this.getProducts();
    });
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '500px',
      data: { product } // Pass the product data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // If result is not null (i.e., user clicked Save)
        this.editProduct(result); // Edit the product with the updated data
      }
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
