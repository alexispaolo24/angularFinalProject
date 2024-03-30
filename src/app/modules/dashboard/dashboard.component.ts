import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products: any[] = []
  categories: string[] = ['Unisex', 'Womens', 'Mens']
  selectedCategory: string= ''
  minPrice: number | null = null
  maxPrice: number | null = null
  sortBy: string = 'asc'
  isAdmin: boolean = false

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ){}
  get filteredProducts(){
    return this.products
      .filter(products => (!this.selectedCategory || products.category === this.selectedCategory) && 
                          (!this.minPrice || products.price >= this.minPrice) && 
                          (!this.maxPrice || products.price <= this.maxPrice))
      .sort((a,b) => this.sortBy === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
  }

  addToCart(product: any){
    console.log(`Added ${product.quantity} ${product.name}(s) to cart.`)
  }

  ngOnInit(){
    this.products = this.productService.getProducts()
    this.isAdmin = this.authService.isAdmin()
    if(this.isAdmin){
      this.products = this.products.sort((a,b) => b.sales - a.sales).slice(0,5)
    }
  }
}
