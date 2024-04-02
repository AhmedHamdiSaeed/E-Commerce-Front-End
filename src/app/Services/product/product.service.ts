import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../category/category-services.service';
import {baseURL} from '../../../.././env'
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${baseURL}/products`;
  private UrlCat =`${baseURL}/category`;

  constructor(private http: HttpClient, private translate: TranslateService) {}


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

  addProduct( product : FormData){
    return this.http.post( this.apiUrl , product )
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
