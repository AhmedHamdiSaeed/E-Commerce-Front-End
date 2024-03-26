import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../category/category-services.service';
import {baseURL} from '../../../.././env'


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiUrl = `${baseURL}/products`;
  private UrlCat =`${baseURL}/category`;

  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get(this.apiUrl);
  }
  getProductById(productId: string) {
    return this.http.get(`${this.apiUrl}/${productId}`);
  }

  getAllCategories()
  {
    return this.http.get(`${this.UrlCat}`)
  }
  getProductsByCategory(categoryId: string) {
    return this.http.get(`${this.apiUrl}/category/${categoryId}`);
  }


  // getAllBrands():any
  // {
  //   return this.http.get(`${this.UrlCat}/api/v1/brands`);
  // }

  getSpecificCategory(pId:string)
  {
    return this.http.get(`${this.UrlCat}/${pId}`);
  }
}
