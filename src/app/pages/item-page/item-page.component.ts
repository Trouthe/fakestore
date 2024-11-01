import { Component, OnInit, inject } from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../components/product-card/product.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FakeshopService } from '../../components/products/fakeshop.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [
    NavigationComponent,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    TitleCasePipe,
    RouterLink,
  ],
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.scss',
})
export class ItemPageComponent implements OnInit {
  product!: Product;
  route = inject(ActivatedRoute);
  shop = inject(FakeshopService);

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.shop.getSingleProduct(Number(productId)).subscribe((data) => {
        this.product = data;
      });
    }
  }
}
