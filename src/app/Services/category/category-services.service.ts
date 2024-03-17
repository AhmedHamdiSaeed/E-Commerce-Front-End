import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/v1/category';
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(`${this.apiUrl}`);
  }
  getCategoryById(categoryId: string) {
    return this.http.get(`${this.apiUrl}/${categoryId}`);
  }
}
