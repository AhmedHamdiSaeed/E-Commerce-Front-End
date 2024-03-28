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
  quantity: number= 0;
  constructor(private http: HttpClient) {   this.updateCartLengthFromLocalStorage();}
  getCarts() {
    return this.http.get(`${this.apiUrl}`);
  }
  cartProducts: any[] = [];
  private cartLengthSubject = new BehaviorSubject<number>(0);

  updateCartLengthFromLocalStorage() {
    const storedCart = JSON.parse(localStorage.getItem("cart") || '[]');
    this.cartProducts = storedCart || [];
    const totalQuantity = this.cartProducts.reduce((total, item) => total + item.quantity, 0);
    this.updateCartLength(totalQuantity);
  }
  addToCart(product: Product, quantity: number) {
    const existingProductIndex = this.cartProducts.findIndex(item => item.product._id === product._id);
    if (existingProductIndex !== -1) {
      this.cartProducts[existingProductIndex].quantity += quantity;
    } else {
      this.cartProducts.push({ product, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.updateCartLengthFromLocalStorage();
    console.log('Quantity added to cart:', quantity);
  }

  updateCartLength(length: number) {
    this.cartLengthSubject.next(length);
  }

  getCartLength() {
    return this.cartLengthSubject.asObservable();
  }

  getTotalQuantityInCart(product: Product): number {
    let totalQuantity = 0;
    for (const item of this.cartProducts) {
      if (item.product._id === product._id) {
        totalQuantity += item.quantity;
      }
    }
    return totalQuantity;
  }

}
