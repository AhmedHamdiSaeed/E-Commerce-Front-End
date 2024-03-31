import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseURL} from '../../../.././env'
import { Category } from '../../models/categoryModel';
import { Icategory } from '../../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl =  `${baseURL}/category`;
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }
  getCategoryById(categoryId: string) {
    return this.http.get(`${this.apiUrl}/${categoryId}`);
  }

  addCategory(Category: FormData){
    return this.http.post(this.apiUrl  , Category)
  }
}
