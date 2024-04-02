import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = ['Unisex', 'Womens', 'Mens'];
  selectedCategory: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortBy: string = 'asc';
  isAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private route:  ActivatedRoute
  ) {}

  ngOnInit() {
    const isAdminQueryParam = this.route.snapshot.queryParamMap.get('isAdmin');
    this.isAdmin = isAdminQueryParam === 'true'; 
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        console.log('Admin', this.isAdmin);
        this.products = products;
        
        if (this.isAdmin) {
          this.products = this.products.sort((a, b) => b.sales - a.sales).slice(0, 5);
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  

  get filteredProducts() {
    return this.products
      .filter(product => (!this.selectedCategory || product.category === this.selectedCategory) &&
                         (!this.minPrice || product.price >= this.minPrice) &&
                         (!this.maxPrice || product.price <= this.maxPrice))
      .sort((a, b) => this.sortBy === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  }

  addToCart(product: Product) { 
    console.log(`Added ${product.quantity} ${product.name}(s) to cart.`);
  }
}
