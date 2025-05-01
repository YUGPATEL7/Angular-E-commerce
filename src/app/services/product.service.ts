import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'assets/products.json'; // For demo purposes, we'll use a local JSON file

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => {
        const product = products.find(p => p.id === id);
        if (!product) {
          throw new Error('Product not found');
        }
        return product;
      })
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => products.filter(product => product.category === category))
    );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => [...new Set(products.map(product => product.category))])
    );
  }
}