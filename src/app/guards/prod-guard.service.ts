import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
// Clase la cual se implementa CanActivate, interfaz la cual se encarga de ser un guardia, si es true la navegación continua
export class ProdGuardService implements CanActivate {

  // Variable que va a ser el rol real que tendremos admin o user
  realRol: string;

  // Se inyectan los servicios necesarios
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  // Funcion del canActivate para poder permitir el paso a la navegación si todo es correcto
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // El rol esperado sera expectedRol
    const expectedRol = route.data.expectedRol;
    this.realRol = this.tokenService.isAdmin() ? 'admin' : 'user';
    // Comprobamos si el rol esperado es el real
    if (!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) < 0) {
      // Si no lo es te devuelve al index y devuelve false, si es lo contrario devuelve true
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
