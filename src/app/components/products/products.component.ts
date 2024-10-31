import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../product-card/product.interface';
import { FakeshopService } from './fakeshop.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, MatButtonModule, MatSidenavModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products = signal<Product[]>([]);
  shop = inject(FakeshopService);

  ngOnInit(): void {
    this.loadProducts();
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
}
