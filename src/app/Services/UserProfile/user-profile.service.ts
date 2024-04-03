import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../../../../env';
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) 
  { }
  getUserUpdate()
  {
    return this.http.get(`${baseURL}/userProfile/update`)
  }
}
