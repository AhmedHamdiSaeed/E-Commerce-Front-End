import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminServices{

  photo: any;
  constructor(private http: HttpClient) {}

  // getProducts(){
  //  return this.http.get('http://localhost:3000/api/v1/admin/products') ;
  // }
  private apiProduct : string ='http://localhost:4000/api/v1/admin/products';
  getProducts() {
    return this.http.get<any>(this.apiProduct).pipe(
      map((res) => {
        // console.log(res.data);
        return res;
      })
    );
  }
  getOrders() {
    return this.http.get<any>('http://localhost:4000/api/v1/admin/orders').pipe(
      map((res) => {
        return res;
      })
    );
  }
  updateProducts(id: any, product: any) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    if (product.photo) {
      formData.append('photo', product.photo, product.photo?.name);
    }

    return this.http.patch(
      this.apiProduct + id,
      formData
    );
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
   AddProduct(product: any) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);

    formData.append('photo', product.photo, product.photo?.name);
    console.log(formData);

    return this.http.post(this.apiProduct, formData);
  }

  deleteProduct(id: any) {
    return this.http.delete(this.apiProduct + id);
  }
  getProductx(id: any) {
    return this.http.get(this.apiProduct + id);
  }
  // updateStatus(id: any, status: any) {
  //   console.log(status, id);
  //   return this.http.patch('https://api-cafebuyers.onrender.com/orders/' + id, status);
  // }
  getUsers() {
    return this.http.get('http://localhost:4000/api/v1/admin/users');
  }
}











