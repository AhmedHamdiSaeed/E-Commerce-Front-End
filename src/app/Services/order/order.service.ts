import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../../../env';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders :any
  constructor(private http:HttpClient) { }

  getUserOrders()
  {
    return this.http.get<any[]>(`${baseURL}/orders`);
  }
  isProductInOrders(productId: string): Observable<boolean> {
    return this.getUserOrders().pipe(
      map(orders => {
        for (const order of orders) {
          for (const cartItem of order.cartItems) {
            if (cartItem.product._id === productId) {
              return true;
            }
          }
        }
        return false;
      })
    );
  }


}