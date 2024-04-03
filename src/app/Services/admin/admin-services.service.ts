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
  private UrlCat =`${baseURL}/category`;

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiProduct).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getAllCategories()
  {
    return this.http.get(`${this.UrlCat}`)
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiProduct}/${productId}`);
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(`${baseURL}/orders`).pipe(
      map((res) => {
        return res;
      })
    );
  }
// not emplimented in the back end yet ! 

  // deleteOrders(orderId: string){
  //   return this.http.delete(`${baseURL}/orders/` + orderId)
  // }

  updateProducts(id: any, product: FormData): Observable<any> {
    return this.http.patch(`${this.apiProduct}/${id}`, product);
  }

  addProduct(product: FormData): Observable<any> {
    return this.http.post(this.apiProduct, product);
  }

  getProductById(id: any): Observable<any> {
    return this.http.get(`${this.apiProduct}/${id}`);
  }

  getUsers(): Observable<appUser[]> {
    return this.http.get<appUser[]>(`${baseURL}/admin/users`);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${baseURL}/admin/users/${userId}`);
  }
  getProductsByCategory(categoryId: string) {
    return this.http.get(`${this.apiProduct}/category/${categoryId}`);
  }
}
