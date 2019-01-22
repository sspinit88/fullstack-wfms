import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import {Router} from "@angular/router";

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(
      private authService: AuthService,
      private router: Router,) {
  }

  // перехватывает все запросы типа HttpRequest<any>
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuth()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.getToken(),
        }
      })
    }
    return next.handle(req) // возвращает observable
        .pipe( // далее делаем обработку получаемой ошибки
            catchError(
                (error: HttpErrorResponse) => this.handleAuthError(error),
            )
        );
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) { // или нет token, или он неправильный
      // отправит на страницу, когда закончится время действия token
      this.router.navigate(['/login'], {
        queryParams: {
          sessionFailed: true,
        }
      });
    }
    return throwError(error);
  }
}