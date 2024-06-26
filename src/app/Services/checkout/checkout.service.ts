import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../../../env';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  checkoutSession:any
  constructor(private httpclient:HttpClient,private router:Router) { }


getOrderByIdWithProducts(id:any)
{
  return this.httpclient.get(`${baseURL}/orders/products/${id}`)
}
  
getPaymentById(ID:any)
{
  return this.httpclient.get(`${baseURL}/payment/${ID}`)
}
checkout(cartID:string)
{
  return this.httpclient.get(`${baseURL}/payment/checkout/${cartID}`)
}
}
