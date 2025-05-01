import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from './services/cart.service';
import { Subscription } from 'rxjs';
import { UserDetailsPopupComponent } from './components/user-details-popup/user-details-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    UserDetailsPopupComponent
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  cartItemCount = 0;
  private cartSubscription: Subscription;

  constructor(private cartService: CartService) {
    this.cartSubscription = this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}