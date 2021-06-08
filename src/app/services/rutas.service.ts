import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Interfaz de los datos de rutas
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

  //URL por defecto para acceder al back
  API_URI = 'http://localhost:8081/api';

  // Implementación que se usa para poder usar rutas http
  constructor(private http: HttpClient) { }

  //Función para enlazar con el listado de rutas
  getRutas(){
    return this.http.get(`${this.API_URI}/rutas`);
  }

}
