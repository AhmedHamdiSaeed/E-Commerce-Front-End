import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {baseURL} from '../../../.././env'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl =  `${baseURL}/cart/add`;
  private apiUrlClear =  `${baseURL}/cart/clare`;
  quantity: number= 0;
  
  constructor(private http: HttpClient ) {   this.updateCartLengthFromLocalStorage();}
  createNewCart(products:any) {
    console.log("cart inside createcartservice :",products)
    return this.http.post(`${this.apiUrl}`,products);
  }
  clearCart(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlClear}`);
   
  }
  Clear(){
    this.cartProducts = [];
    this.setItem();
    this.updateCartLengthFromLocalStorage();
    
  }
  cartProducts: any[] = [];
  private cartLengthSubject = new BehaviorSubject<number>(0);

  
  setItem(){
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
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
  
  removeFromCart(product: Product): void {
    // Retrieve the cart data from localStorage
    const cartDataString = localStorage.getItem('cart');
    if (cartDataString) {
      // Parse the cart data into an array of products
      const cartData: { product: Product, quantity: number }[] = JSON.parse(cartDataString);
      // Find the index of the product in the cartData array
      const index = cartData.findIndex(item => item.product._id === product._id);
      if (index !== -1) {
        // If the quantity is greater than 1, decrement it
        if (cartData[index].quantity > 1) {
          cartData[index].quantity--;
        } else {
          // If the quantity is 1, remove the product from the cartData array
          cartData.splice(index, 1);
        }
        // Update the cart data in localStorage
        localStorage.setItem('cart', JSON.stringify(cartData));
        this.updateCartLengthFromLocalStorage();
        console.log('Product quantity updated in cart');
      }
    }
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
