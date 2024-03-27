import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable} from 'rxjs';
import { AuthService } from './auth.service';
import { map , take} from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.auth.userSubject.pipe(
      take(1),
      map((user: User | null) => {
        if (!user) {
          return this.router.createUrlTree(['/login']);
        } else if (user.role === 'admin' && state.url === '/admin') {
          return this.router.createUrlTree(['/Admin']);
        } else {
          return true;
        }
      })
    );
  }
}
