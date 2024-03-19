import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:4000/api/v1/cart';

  constructor(private http: HttpClient) { }
  getCarts() {
    return this.http.get(`${this.apiUrl}`);
  }

}
