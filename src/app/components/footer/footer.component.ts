import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  storeName = 'Your Store Name';
} 