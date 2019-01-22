import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {of} from "rxjs";

@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
      private authService: AuthService,
      private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.authService.isAuth()) {
      return of(true); // оборачиваем в observable и возвращаем true
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          accessDenied: true,
        }
      });
      return of(false);
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state)
  }

}