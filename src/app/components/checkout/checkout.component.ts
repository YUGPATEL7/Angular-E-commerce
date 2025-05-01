import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { MaterialModule } from '../../material.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  total = 0;
  cartTotal = 0;
  orderSubmitted = false;
  checkoutForm: FormGroup;
  private subscription: Subscription;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder
  ) {
    this.subscription = this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });

    this.checkoutForm = this.fb.group({
      personalInfo: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]]
      }),
      shippingAddress: this.fb.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
      }),
      paymentInfo: this.fb.group({
        cardName: ['', Validators.required],
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
      })
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private calculateTotal(): void {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    this.cartTotal = this.total;
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      // Here you would typically send the order to your backend
      console.log('Order submitted:', this.checkoutForm.value);
      this.orderSubmitted = true;
      this.cartService.clearCart();
    } else {
      this.markFormGroupTouched(this.checkoutForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}