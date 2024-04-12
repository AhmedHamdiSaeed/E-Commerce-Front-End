import { Injectable } from '@angular/core';
import { baseURL } from '../../../../env';
import { HttpClient } from '@angular/common/http';
import { Review } from '../../models/Review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl =  `${baseURL}/review`;
  constructor(private http: HttpClient ) { }
  getReviews(productId: string):Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}?product=${productId}`);
  }

  createReview(review:Review){
    return this.http.post(`${this.apiUrl}`, review);
  }

  updateReview(reviewId: string,review:Review){
    return this.http.put(`${this.apiUrl}/${reviewId}`, review);
  }

  deleteReview(reviewId: string){
    return this.http.delete(`${this.apiUrl}/${reviewId}`);
  }

  getReviewById(reviewId:string){
    return this.http.get<Review>(`${this.apiUrl}/${reviewId}`);
  }
  getStarsArray(ratting: number): number[] {
    return Array(ratting).fill(0);
  }
 
}
