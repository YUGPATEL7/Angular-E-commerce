import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserDetailsPopupComponent } from '../user-details-popup/user-details-popup.component';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    UserDetailsPopupComponent
  ]
})
export class HeaderComponent implements OnDestroy {
  cartItemCount = 0;
  private subscription: Subscription;

  constructor(private cartService: CartService) {
    this.subscription = this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.length;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout(): void {
    // Implement logout logic here
    console.log('Logging out...');
    // You would typically clear user session, tokens, etc.
  }
}