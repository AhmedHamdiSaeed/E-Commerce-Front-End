import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs'
import {baseURL} from '../../../.././env'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth:AuthService,) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return this.auth.userSubject.pipe(
    take(1)
    ,exhaustMap(user => {
      if (!user || !user.Token) {
        return next.handle(req);
      }

      // Attach token in the Authorization header
      const modifiedReq = req.clone({
        setHeaders: {
          jwt: ` ${user.Token}`
        }
      });

      return next.handle(modifiedReq);
    })
   )
  }
}

