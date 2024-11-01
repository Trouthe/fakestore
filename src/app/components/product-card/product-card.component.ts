import { Component, Input, inject } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';

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
  router = inject(Router);

  goto(title: string, id: number): void {
    let formattedTitle = title.replace(/\s+/g, '-');
    
    this.router.navigate([`${formattedTitle}`, this.product.id]);
  }

  debug(message: string): void {
    console.log('Clicked ', message);
  }
}
