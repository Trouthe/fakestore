import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { Product } from '../../components/product-card/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FakeshopService } from '../../components/products/fakeshop.service';

@Component({
  selector: 'app-electronics',
  standalone: true,
  imports: [
    ProductCardComponent,
    NavigationComponent,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  templateUrl: './electronics.component.html',
  styleUrl: '../../components/products/products.component.scss',
})
export class ElectronicsComponent implements OnInit {
  products = signal<Product[]>([]);
  shop = inject(FakeshopService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.shop.getProductsByCategory('electronics').subscribe((data) => {
      this.products.set([...data]);
    });
  }

  loadMore(limit: number) {
    this.shop
      .getMoreProductsByCategory('electronics', limit)
      .subscribe((data) => {
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
}
