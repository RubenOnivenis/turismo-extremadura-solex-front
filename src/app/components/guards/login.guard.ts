import { TokenService } from 'src/app/services/token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
// Clase la cual se implementa CanActivate, interfaz la cual se encarga de ser un guardia, si es true la navegación continua
export class LoginGuard implements CanActivate {

  // Se inyectan los servicios necesarios
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  // Función para comprobar si el usuario está logeado, si no lo está se recarga la página y envia al actor al home
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.tokenService.isLogged()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
