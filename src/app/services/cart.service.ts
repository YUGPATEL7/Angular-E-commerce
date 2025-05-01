import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    // Load cart items from localStorage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(product: Product) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ product, quantity: 1 });
    }

    this.cartItems.next([...currentItems]);
    this.saveCart();
  }

  removeFromCart(productId: string) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedItems);
    this.saveCart();
  }

  updateQuantity(productId: string, quantity: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
      this.saveCart();
    }
  }

  clearCart() {
    this.cartItems.next([]);
    this.saveCart();
  }

  getTotal(): number {
    return this.cartItems.value.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }
}