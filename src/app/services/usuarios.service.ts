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

  //URL por defecto para acceder al back
  API_URI = 'http://localhost:8081/api';

  // Implementación que se usa para poder usar rutas http
  constructor(private http: HttpClient) { }

  //Función para enlazar con el listado de usuarios
  getUsuarios(){
    return this.http.get(`${this.API_URI}/usuarios`);
  }

  //Función para enlazar con los datos de un usuario
  getUsuario(nombre_usuario: string){
    return this.http.get(`${this.API_URI}/usuario/${nombre_usuario}`);
  }

  //Función para enlazar con la modificación de los datos de un usuario
  updateUsuario(nombre_usuario: string, usuario: usuariosDatos){
    return this.http.put(`${this.API_URI}/usuarios/${nombre_usuario}`, usuario);
  }

}
