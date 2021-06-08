import { AuthService } from 'src/app/services/auth.service';
import { JwtDTO } from './../models/jwt-dto';
import { catchError, concatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

// Constante de autorización
const AUTHORIZATION = 'Authorization';

@Injectable({
  providedIn: 'root'
})

// Implementa un transformador de Http
export class ProdInterceptorService implements HttpInterceptor {

  constructor(
    // Implementación del servicio del token
    private tokenService: TokenService,
    // Implementación del servicio de autenticación
    private authService: AuthService
  ) { }

  // Interceptador de Http
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Comprobación para saber si el usuario ha iniciado sesión
    if (!this.tokenService.isLogged()) {
      return next.handle(req);
    }

    // Variables necesarias
    let intReq = req;
    // Variable que guarda el token del usuario
    const token = this.tokenService.getToken();

    // Variable que se iguala al token
    intReq = this.addToken(req, token);

    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const dto: JwtDTO = new JwtDTO(this.tokenService.getToken());
        return this.authService.refresh(dto).pipe(concatMap((data: any) => {
          console.log('refreshing....');
          this.tokenService.setToken(data.token);
          intReq = this.addToken(req, data.token);
          return next.handle(intReq);
        }));
      } else {
        this.tokenService.logOut();
        return throwError(err);
      }
    }));
  }

  // Función que retorna el token del usuario para la autorización
  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  }
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true }];
