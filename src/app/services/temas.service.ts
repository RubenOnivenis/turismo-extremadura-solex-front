import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface temasDatos{
  id_tema?:number,
  nombreTema:string,
  id_usuario?:number,
  fch_hora_tema:Date,
  comentario_tema	:string
}

export interface comentariosDatos{
  id_comentario_foro?:number,
  comentario:string,
  id_usuario?:number,
  id_tema?:number,
  fch_hora_comentario:Date
}

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  API_URI= 'http://localhost:8081/api';
  API_URI_LOG= 'http://localhost:8080/api';

  constructor(
    private http: HttpClient
  ) { }

  cargarTemas(){
    return this.http.get<any>(this.API_URI + `/temas_foro/`);
  }

  cargarTema(id_tema: number){
    return this.http.get(this.API_URI + `/temas_foro/${id_tema}`);
  }

  cargarComentarios(id_tema: Number){
    return this.http.get<any>(this.API_URI + `/comentarios_foro/${id_tema}`);
  }

  guardar(){
    
  }

  anadirTema(tema: temasDatos){
    return this.http.post(this.API_URI_LOG + '/temas_foro', tema);
  }

  comentar(comentario: comentariosDatos){
    return this.http.post(this.API_URI_LOG + '/comentario_foro/', comentario);
  }
  
}
