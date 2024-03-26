import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {baseURL} from '../../../.././env'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl =  `${baseURL}/cart`;

  constructor(private http: HttpClient) {   this.updateCartLengthFromLocalStorage();}
  getCarts() {
    return this.http.get(`${this.apiUrl}`);
  }
  cartProducts: any[] = [];
  private cartLengthSubject = new BehaviorSubject<number>(0);

  private updateCartLengthFromLocalStorage() {
    const cartItems: Product[] = JSON.parse(localStorage.getItem("cart") || '[]');
    this.updateCartLength(cartItems.length);
  }
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
