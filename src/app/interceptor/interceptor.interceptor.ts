import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const loginUrl: string = 'http://localhost:8044/auth/login';
    const registroUrl: string = 'http://localhost:8044/auth/registro';

    // Si estamos en el login o registro todavía no tenemos token, así que no interceptamos la petición
    if (req.url === loginUrl || req.url === registroUrl){
      return next.handle(req);
    } else {

      const token: string | null = localStorage.getItem('token');

      let request = req.clone({ withCredentials: true });

      if (token) {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${ token }`,
            'content-type': 'application/json'
          }
        });
      }

      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {

          //console.log(err);

          if (err.status === 401) {
            this.auth.logout()
            this.router.navigateByUrl('/login');
          }

          return throwError( err );

        })
      );


    }

  }
}
