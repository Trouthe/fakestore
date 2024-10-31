import { Component, Input } from '@angular/core';
import { SlicePipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Product } from './product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, SlicePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  // test: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
  @Input() product!: Product;
}
