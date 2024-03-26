import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseURL} from '../../../.././env'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl =  `${baseURL}/category`;
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(`${this.apiUrl}`);
  }
  getCategoryById(categoryId: string) {
    return this.http.get(`${this.apiUrl}/${categoryId}`);
  }
}
