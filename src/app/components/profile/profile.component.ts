import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ProfileComponent implements OnInit {
  user: any;
  editableUser = {
    name: '',
    email: ''
  };
  isEditing = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    if (this.user) {
      this.editableUser = {
        name: this.user.name || '',
        email: this.user.email || ''
      };
    }
  }

  startEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    // Reset editable user to current user data
    if (this.user) {
      this.editableUser = {
        name: this.user.name || '',
        email: this.user.email || ''
      };
    }
  }

  saveProfile(): void {
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
} 