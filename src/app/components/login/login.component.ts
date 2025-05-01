import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // If already logged in, redirect to home
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  login(): void {
    this.loading = true;
    this.errorMessage = '';
    
    // Validate required fields
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Email and password are required';
      this.loading = false;
      return;
    }
    
    // Check if this is a registered user by looking in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = registeredUsers.find((user: any) => 
      user.email === this.credentials.email && user.password === this.credentials.password
    );
    
    if (!foundUser) {
      this.errorMessage = 'Invalid email or password';
      this.loading = false;
      return;
    }
    
    // Create user object without the password
    const userToStore = {
      name: foundUser.name,
      email: foundUser.email,
      token: 'demo-token-' + Math.random().toString(36).substring(2)
    };
    
    // Store user details in localStorage
    localStorage.setItem('currentUser', JSON.stringify(userToStore));
    
    // Update the current user in AuthService
    this.authService.updateCurrentUser(userToStore);
    
    // Navigate to home page
    this.router.navigate(['/']);
    
    this.loading = false;
  }
} 