import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { baseURL } from '../../../.././env';
import { appUser } from '../../models/applicationUser';
@Injectable({
  providedIn: 'root',
})
export class AdminServices {
  photo: any;
  constructor(private http: HttpClient) {}

  private apiProduct: string = `${baseURL}/products`;
  getProducts() {
    return this.http.get<any>(this.apiProduct).pipe(
      map((res) => {
        // console.log(res);
        return res;
      })
    );
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${this.apiProduct}/${productId}`);
  }

  getOrders() {
    return this.http.get<any>(`${baseURL}/orders`).pipe(
      map((res) => {
        return res;
      })
    );
  }
  updateProducts(id: any, product : FormData) {


    return this.http.patch(this.apiProduct + id, product);
  }
  // getOrders(){
  //   return this.http.get('http://localhost:3000/api/v1/admin/orders') ;
  //  }

  //  getCategories(){
  //   return this.http.get('http://localhost:3000/api/v1/admin/categories') ;
  //  }

  //  getUsers(){
  //   return this.http.get('http://localhost:3000/api/v1/admin/users') ;
  //  }

  addProduct( product : FormData){
    return this.http.post( this.apiProduct , product )
  }

  getProductById(id: any) {
    return this.http.get(`${this.apiProduct}/${ id}`);
  }

  getUsers() {
    return this.http.get<appUser[]>(baseURL +'/admin/users');
  }

  deleteUser(userId : string){
    return this.http.delete(baseURL + '/admin/users/' + userId );
  }
}
