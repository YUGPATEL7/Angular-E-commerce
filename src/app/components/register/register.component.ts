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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  errors: { [key: string]: string } = {};
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
  
  validate(): boolean {
    this.errors = {};
    
    if (!this.user.name) {
      this.errors['name'] = 'Name is required';
    }
    
    if (!this.user.email) {
      this.errors['email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(this.user.email)) {
      this.errors['email'] = 'Email is invalid';
    }
    
    if (!this.user.password) {
      this.errors['password'] = 'Password is required';
    } else if (this.user.password.length < 6) {
      this.errors['password'] = 'Password must be at least 6 characters';
    }
    
    if (!this.user.confirmPassword) {
      this.errors['confirmPassword'] = 'Please confirm your password';
    } else if (this.user.password !== this.user.confirmPassword) {
      this.errors['confirmPassword'] = 'Passwords do not match';
    }
    
    // Check if email is already registered
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (registeredUsers.some((u: any) => u.email === this.user.email)) {
      this.errors['email'] = 'Email is already registered';
    }
    
    return Object.keys(this.errors).length === 0;
  }
  
  register(): void {
    this.loading = true;
    this.errorMessage = '';
    
    // Validate the form
    if (!this.validate()) {
      this.errorMessage = 'Please fix the errors in the form';
      this.loading = false;
      return;
    }
    
    // Get registered users or initialize empty array
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Add new user to the array
    registeredUsers.push({
      name: this.user.name,
      email: this.user.email,
      password: this.user.password // In a real app, this would be hashed
    });
    
    // Save back to localStorage
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    // Navigate to login
    this.router.navigate(['/login']);
    
    this.loading = false;
  }
} 