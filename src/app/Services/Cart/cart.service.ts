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
  private cartItems: any[] = [];
  private cartLengthSubject = new BehaviorSubject<number>(0);


  addToCart(product: Product) {
    let cartProducts: Product[] = JSON.parse(localStorage.getItem("cart") || '[]');
    let isExist = cartProducts.find(i => i._id === product._id);
    if (!isExist) {
      cartProducts.push(product);
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      this.updateCartLength(cartProducts.length);
    }
  }

  updateCartLength(length: number) {
    this.cartLengthSubject.next(length);
  }

  getCartLength() {
    return this.cartLengthSubject.asObservable();
  }

  

}
