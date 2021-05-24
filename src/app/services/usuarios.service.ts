import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface usuariosDatos{
  id?:number,
  nombre_usuario?:string,
  nombre:string,
  apellidos:string,
  fch_nacimiento:Date,
  email:string,
  password:string,
  telefono:string
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API_URI = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient
  ) { }

  getUsuarios(){
    return this.http.get(`${this.API_URI}/usuarios`);
  }

  getUsuario(id: number){
    return this.http.get(`${this.API_URI}/usuario/${id}`);
  }

  updateUsuario(id: number, usuario: usuariosDatos){
    return this.http.put(`${this.API_URI}/usuarios/${id}`, usuario);
  }

  updatePassUsuario(id: number, usuario: usuariosDatos){
    return this.http.put(`${this.API_URI}/usuarios/pass/${id}`, usuario);
  }

}
