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

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`https://fakestoreapi.com/products/category/${category}`);
  }

  getMoreProducts(limit: number): Observable<Product[]> {
    return this.http.get<Product[]>(`https://fakestoreapi.com/products?limit=${limit}`);
  }

  getMoreProductsByCategory(category: string, limit: number): Observable<Product[]> {
    return this.http.get<Product[]>(`https://fakestoreapi.com/products/category/${category}?limit=${limit}`);
  }

  getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`);
  }
}
