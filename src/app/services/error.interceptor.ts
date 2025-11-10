import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'Ocurrió un error desconocido.';

        if (error.status === 401 || error.status === 403) {
          message = 'Tu sesión ha expirado. Inicia sesión nuevamente.';
          this.authService.logout();
          this.router.navigate(['/login']);
        } else if (error.error?.detail) {
          message = error.error.detail;
        } else if (error.status === 0) {
          message = 'No se pudo conectar con el servidor.';
        }

        alert(message);
        return throwError(() => error);
      })
    );
  }
}
