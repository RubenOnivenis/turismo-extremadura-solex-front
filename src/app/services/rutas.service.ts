import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface rutasDatos{
  id_ruta?:number,
  id_localizacion?:number,
  imagen:string,
  nombre:string,
  nombreLocalizacion:string,
  descripcion:string,
  url:string
}

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  API_URI = 'http://localhost:8081/api';

  constructor(
    private http: HttpClient
  ) { }

getRutas(){
  return this.http.get(`${this.API_URI}/rutas`);
}

}
