import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { AuthResponseData } from '../../models/authResponse';
import { BehaviorSubject } from 'rxjs';
import {tap} from 'rxjs/operators' ;
import {  Router } from '@angular/router';
import {baseURL} from '../../../.././env'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  token!: string ;
  constructor( private http: HttpClient,
              private router: Router) { }

  userSubject  = new BehaviorSubject<User | null>(null);

  register( fname: string , lname: string , email: string , password: string){
    return  this.http.post( `${baseURL}/register` , {
      "fname": fname,
      "lname": lname,
      "email":email ,
      "password": password

    })
  }


  
  login(email: string , password: string){
   return  this.http.post<AuthResponseData>( `${baseURL}/login` , {
      "email": email ,
      "password": password
    }).pipe(tap((resData)=>{

      const expireDate = new Date(new Date().getTime() + ( +resData.expiresIn * 60 * 60 *1000)) ;
      // console.log(resData.expiresIn);

      const newUser = new User(resData.user.fname , resData.user.lname , resData.user.email , resData.user.role ,resData.user._id, resData.token ,expireDate,) ;
      this.userSubject.next(newUser) ;
      localStorage.setItem("userData" , JSON.stringify(newUser)) ;
    }))
  }


  autoLogin(){
    const temp = localStorage.getItem("userData");

    if(temp) {
      const loadUser :{
        fname : string ,
        lname: string ,
        email: string ,
        role: string ,
        _id: string ,
         _token: string ,
         tokenExpireDate: string
      }= JSON.parse(temp)

      const newUser = new User(loadUser.fname , loadUser.lname ,loadUser.email, loadUser.role,loadUser._id , loadUser._token , new Date(loadUser.tokenExpireDate)) ;
      // console.log(loadUser.tokenExpireDate);

      if(newUser.Token){
        this.userSubject.next(newUser);
      }else{
        this.router.navigateByUrl('/login');
      }
    }
  }
  isAuthenticated(): boolean {
    const userData = localStorage.getItem('userData');
    return !!userData;
  }
  logout(){
    this.userSubject.next(null);
    localStorage.removeItem("userData")
    this.router.navigate(['/login']);
  }


}
