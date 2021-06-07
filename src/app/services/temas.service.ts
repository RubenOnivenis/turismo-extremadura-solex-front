import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Interfaz de los campos de los temas del foro
export interface temasDatos{
  id_tema?:number,
  nombreTema:string,
  idUsuario:number,
  fchHoraTema:Date,
  comentarioTema:string,
  nombre_usuario?:string,
}

// Interfaz de los campos de los comentarios del foro
export interface comentariosDatos{
  id_comentario_foro?:number,
  comentario:string,
  id_usuario:number,
  id_tema:number,
  fch_hora_comentario:Date
}

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  // URL de la api (solex_back_inf)
  API_URI = 'http://localhost:8081/api';

  constructor(
    private http: HttpClient
  ) { }

  // Función para mostrar todos los temas del foro
  cargarTemas(){
    return this.http.get<any>(this.API_URI + `/foro_temas_datos/`);
  }

  // Función para mostrar un solo tema del foro
  cargarTema(id_tema: number){
    return this.http.get(this.API_URI + `/foro_temas_datos/${id_tema}`);
  }

  // Función para enlazar con la búsqueda de temas
  buscarTema(nombre: string) {
    return this.http.get(this.API_URI + `/foro_temas_datos/nombre/${nombre}`);
  }

  // Función para borrar un tema
  eliminiarTema(id_tema:number){
    return this.http.delete(this.API_URI + `/temas_foro/${id_tema}`);
  }
  
  // Función para mostrar todos los comentarios del foro
  cargarComentarios(){
    return this.http.get<any>(this.API_URI + `/comentarios_foro_datos/`);
  }

  // Función para mostrar los comentarios de cada tema en el foro
  cargarComentario(id_comentario_foro: Number){
    return this.http.get<any>(this.API_URI + `/comentarios_foro_datos/${id_comentario_foro}`);
  }

  // Función para añadir un tema
  anadirTema(tema: temasDatos){
    return this.http.post(this.API_URI + '/temas_foro', tema);
  }

  // Función para añadir comentarios a un tema
  comentar(comentario: comentariosDatos){
    return this.http.post(this.API_URI + '/comentario_foro', comentario);
  }

  eliminarComentario(id_comentario_foro: number){
    return this.http.delete(this.API_URI + `/comentario_foro/${id_comentario_foro}`);
  }
  
}
