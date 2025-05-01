import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { MaterialModule } from '../../material.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MaterialModule]
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  total = 0;
  private subscription: Subscription;

  constructor(private cartService: CartService) {
    this.subscription = this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateQuantity(productId: string, newQuantity: number): void {
    if (newQuantity > 0) {
      this.cartService.updateQuantity(productId, newQuantity);
    }
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  private calculateTotal(): void {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  getTotal(): number {
    return this.total;
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  placeOrder(): void {
    // This would normally connect to a payment processing service
    // For now, we'll just show an alert and clear the cart
    alert('Thank you for your order! Your purchase was successful.');
    this.clearCart();
  }
}