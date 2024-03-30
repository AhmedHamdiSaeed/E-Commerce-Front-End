import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  constructor(private http: HttpClient) { }

  sendEmail(name: string, email: string, message: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('http://localhost:3000/send-email', { name, email, message }, { headers, responseType: 'text' as 'json' });
  }
}
