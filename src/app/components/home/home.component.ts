import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class HomeComponent implements OnInit {
  categories: string[] = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Kitchen',
    'Sports',
    'Beauty'
  ];

  featuredProducts: Product[] = [];
  loading = true;
  error = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.featuredProducts = products
          .sort((a: Product, b: Product) => b.rating - a.rating)
          .slice(0, 6);
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
        this.loading = false;
        this.error = true;
      }
    });
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['/products'], {
      queryParams: { category: category.toLowerCase() }
    });
  }

  getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      'Electronics': 'devices',
      'Clothing': 'checkroom',
      'Books': 'menu_book',
      'Home & Kitchen': 'kitchen',
      'Sports': 'sports_soccer',
      'Beauty': 'spa'
    };
    return iconMap[category] || 'category';
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}