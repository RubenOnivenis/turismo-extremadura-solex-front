import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // Array con los roles
  roles: Array<string> = [];

  constructor() { }

  // Función setToken
  public setToken(token: string): void {
    // Se elimina el token de la constante de la línea 4
    window.localStorage.removeItem(TOKEN_KEY);
    // Se coloca el item el token de la constante de la línea 4 y se le pasa el token que tenemos como parámetro
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  // Función getToken
  public getToken(): string {
    //Devolvemos el token de la constante de la línea 4
    return localStorage.getItem(TOKEN_KEY);
  }

  // Función para comprobar si el usuario está logeado
  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  // Funcion para el usuario no el admin. Recoge el token y lo divide para comprobarlo
  public getUserName(): string {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const username = values.sub;
    return username;
  }

  // Función para comprobar si es admin. Recoge el token y lo divide para comprobarlo
  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }

  // Función de cerrar sesión. Elimina el token y recarga la pagina.
  public logOut(): void {
    window.localStorage.clear();
    location.reload();
  }
}
