import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  constructor( private http: HttpClient) { }

  getProducts(){
   return this.http.get('http://localhost:4000/api/v1/admin/products') ;
  }

  getOrders(){
    return this.http.get('http://localhost:4000/api/v1/admin/orders') ;
   }

   getCategories(){
    return this.http.get('http://localhost:4000/api/v1/admin/categories') ;
   }

   getUsers(){
    return this.http.get('http://localhost:4000/api/v1/admin/users') ;
   }
}
