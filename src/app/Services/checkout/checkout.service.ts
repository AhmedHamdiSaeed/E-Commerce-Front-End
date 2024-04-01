import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../../../env';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient ) { }

checkout(cartID:string)
{
  return this.http.get(`${baseURL}/payment/checkout/${cartID}`)
}
}
