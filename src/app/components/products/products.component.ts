import {
  Component,
  OnInit,
  inject,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../product-card/product.interface';
import { FakeshopService } from './fakeshop.service';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductCardComponent,
    MatButtonModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsComponent implements OnInit {
  products = signal<Product[]>([]);
  shop = inject(FakeshopService);
  router = inject(Router);

  ngOnInit(): void {
    this.loadProducts();
  }
  
  goto(page: string): void {
    this.router.navigate([page]);
  }

  loadProducts() {
    this.shop.getProducts().subscribe((data) => {
      this.products.update((currentData) => [...currentData, ...data]);
    });
  }

  loadMore(limit: number) {
    this.shop.getMoreProducts(limit).subscribe((data) => {
      this.products.update((currentData) => [...currentData, ...data]);
    });
  }

  sortByPrice(order: 'asc' | 'desc') {
    this.products.update((currentProducts) => {
      return [...currentProducts].sort((a, b) =>
        order === 'asc' ? a.price - b.price : b.price - a.price
      );
    });
  }

  sortByCategory(category: string) {
    if (category === 'all') {
      this.shop.getProducts().subscribe((data) => {
        this.products.update((currentData) => data);
      });
    } else {
      this.shop.getProductsByCategory(category).subscribe((data) => {
        this.products.update((currentData) => data);
      });
    }
  }
}
