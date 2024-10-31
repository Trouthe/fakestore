import { Component } from '@angular/core';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { ProductsComponent } from '../components/products/products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavigationComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
