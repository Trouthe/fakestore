import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { Product } from '../../components/product-card/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FakeshopService } from '../../components/products/fakeshop.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-clothing',
  standalone: true,
  imports: [ProductCardComponent, MatButtonToggleModule, NavigationComponent, MatButtonModule],
  templateUrl: './clothing.component.html',
  styleUrl: '../../components/products/products.component.scss',
})
export class ClothingComponent implements OnInit {
  products = signal<Product[]>([]);
  shop = inject(FakeshopService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    forkJoin([
      this.shop.getProductsByCategory("men's clothing"),
      this.shop.getProductsByCategory("women's clothing"),
    ]).subscribe(([menData, womenData]) => {
      this.products.set([...menData, ...womenData]);
    });
  }

  loadMore(limit: number) {
    forkJoin([
      this.shop.getMoreProductsByCategory("men's clothing", limit),
      this.shop.getMoreProductsByCategory("women's clothing", limit),
    ]).subscribe(([menData, womenData]) => {
      this.products.update((currentData) => [...currentData, ...womenData, ...menData]);
    });
  }

  sortByPrice(order: 'asc' | 'desc') {
    this.products.update((currentProducts) => {
      return [...currentProducts].sort((a, b) =>
        order === 'asc' ? a.price - b.price : b.price - a.price
      );
    });
  }
}
