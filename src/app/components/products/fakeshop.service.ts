import { Injectable, inject } from '@angular/core';
import { Product } from '../product-card/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FakeshopService {
  http = inject(HttpClient);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`https://fakestoreapi.com/products`);
  }

  getMoreProducts(limit: number): Observable<Product[]> {
    return this.http.get<Product[]>(`https://fakestoreapi.com/products?limit=${limit}`);
  }
}
