import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-dto';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variable con el enlace enviroment esta en environments/environment.ts, al igual que authURL
  authURL = environment.authURL;

  // Se inyecta en el constructor HttpClient
  constructor(private httpClient: HttpClient) { }

  // Método del nuevo usuario
  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    // Devolvemos el post para añadir el usuario nuevo
    // En el post es <any> porque en el back devuelve un obj no específico
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  // Método del login
  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    // Devolvemos el post para iniciar sesión con el usuario existente
    // En el post es <jwtDTO> porque en el back devuelve un obj jwtDTO
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }

  public refresh(dto: JwtDTO): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'refresh', dto);
  }
}
