import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Product } from '../../models/product';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  username: string = '';
  isAdmin: boolean = false;
  products: Product[] = [];
  page = 1;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const isAdminParam = this.route.snapshot.paramMap.get('isAdmin');
this.isAdmin = isAdminParam === 'true';
    const usernameParam = this.route.snapshot.paramMap.get('username');
    this.username = usernameParam ? usernameParam : ''; // Provide a default value if usernameParam is null
    this.getProducts();
    console.log(this.isAdmin);
    console.log(this.username)

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
        this.addProduct(newProduct);
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
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editProduct(result);
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

  pageChanged(event: any): void {
    this.page = event.pageIndex + 1;
  }
}
