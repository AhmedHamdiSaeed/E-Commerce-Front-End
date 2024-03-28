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
  quantity: number=1;
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
  addToCart(product: Product, quantity: number) {
    let cartProducts: Product[] = JSON.parse(localStorage.getItem("cart") || '[]');
    const existingProductIndex = cartProducts.findIndex((item) => item._id === product._id);
    if (existingProductIndex !== -1) {
      cartProducts[existingProductIndex].quantity += quantity;
    } else {
      const productWithQuantity = { ...product, quantity: quantity };
      cartProducts.push(productWithQuantity);
    }
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    this.updateCartLength(cartProducts.length);
  }

  updateCartLength(length: number) {
    this.cartLengthSubject.next(length);
  }

  getCartLength() {
    return this.cartLengthSubject.asObservable();
  }



}
