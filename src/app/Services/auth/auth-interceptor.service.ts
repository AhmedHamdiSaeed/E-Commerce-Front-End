import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs'
import {baseURL} from '../../../.././env'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor,OnInit {
  local:any
  constructor(private auth:AuthService,) 
  { 

  }
  ngOnInit(): void {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
   return this.auth.userSubject.pipe(
    take(1)
    ,exhaustMap(user => {
      if (!user || !user.Token) {
        return next.handle(req);
      }
      const JsonObject=localStorage.getItem("userData");
                var obj;
                if(JsonObject)
                  {
                    obj=JSON.parse(JsonObject);
                  }
      const modifiedReq = req.clone({
        setHeaders: {
          jwt: ` ${obj._token}`
        }
      });
      return next.handle(modifiedReq);
    })
   )
  }
}

