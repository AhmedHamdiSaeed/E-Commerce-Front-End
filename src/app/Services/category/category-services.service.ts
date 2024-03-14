import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/categoryModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServicesService {

  constructor( private http: HttpClient) { }

  getCategory(): Observable<Category[]> {
   return  this.http.get<Category[]>("http://localhost:4000/api/v1/category") ;
  }
}
