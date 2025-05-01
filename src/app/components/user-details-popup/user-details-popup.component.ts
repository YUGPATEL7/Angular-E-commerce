import { Component, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-details-popup',
  templateUrl: './user-details-popup.component.html',
  styleUrls: ['./user-details-popup.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class UserDetailsPopupComponent implements OnInit, OnDestroy {
  user: any;
  isOpen = false;
  isEditing = false;
  isLoggedIn = false;

  // Edit form fields
  editableUser = {
    name: '',
    email: ''
  };

  constructor(
    private authService: AuthService, 
    private elementRef: ElementRef,
    private router: Router
  ) {
    console.log('UserDetailsPopupComponent constructor');
  }

  ngOnInit(): void {
    console.log('UserDetailsPopupComponent ngOnInit');
    this.loadUserData();
    
    // Set initial state for testing
    this.isOpen = true;
    console.log('Initial popup state set to:', this.isOpen);
  }

  loadUserData(): void {
    this.user = this.authService.currentUserValue;
    console.log('Current user:', this.user);
    
    // Check if user is logged in
    this.isLoggedIn = !!this.user;
    
    if (this.user) {
      // Copy user data to editable form
      this.editableUser = {
        name: this.user.name || '',
        email: this.user.email || ''
      };
    }
  }

  ngOnDestroy(): void {
    // Cleanup
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    console.log('Click event, inside component:', clickedInside);
    
    if (this.isOpen && !clickedInside) {
      this.closePopup();
    }
  }

  togglePopup(event?: MouseEvent): void {
    console.log('Toggle popup, current state:', this.isOpen);
    
    // Prevent click event from propagating to document
    if (event) {
      event.stopPropagation();
    }
    
    this.isOpen = !this.isOpen;
    console.log('New state:', this.isOpen);
  }

  closePopup(): void {
    console.log('Close popup');
    this.isOpen = false;
    this.isEditing = false;
  }

  startEdit(event: Event): void {
    event.stopPropagation();
    this.isEditing = true;
  }

  cancelEdit(event: Event): void {
    event.stopPropagation();
    this.isEditing = false;
    
    // Reset editable user to current user data
    if (this.user) {
      this.editableUser = {
        name: this.user.name || '',
        email: this.user.email || ''
      };
    }
  }

  saveProfile(event: Event): void {
    event.stopPropagation();
    console.log('Saving profile:', this.editableUser);
    
    // Update user data
    const updatedUser = {
      ...this.user,
      name: this.editableUser.name,
      email: this.editableUser.email
    };
    
    // Save to local storage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update auth service
    this.authService.updateCurrentUser(updatedUser);
    
    // Update local user object
    this.user = updatedUser;
    
    // Exit edit mode
    this.isEditing = false;
  }

  logout(): void {
    console.log('Logout clicked');
    this.authService.logout();
    this.closePopup();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  login(): void {
    this.closePopup();
    this.router.navigate(['/login']);
  }

  register(): void {
    this.closePopup();
    this.router.navigate(['/register']);
  }
}
