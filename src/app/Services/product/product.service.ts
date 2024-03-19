import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../category/category-services.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:4000/api/v1/products';

  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get(this.apiUrl);
  }
  getProductById(productId: string) {
    return this.http.get(`${this.apiUrl}/${productId}`);
  }
}
