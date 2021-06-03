import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Interfaz de los datos de alojamientos
export interface alojamientosDatos{
  id_alojamiento?:number,
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
export class AlojamientosService {

  //URL por defecto para acceder al back
  API_URI = 'http://localhost:8081/api';

  constructor(
    private http: HttpClient
  ) { }

  //Función para enlazar con el listado de alojamientos
  getAlojamientos(){
    return this.http.get(`${this.API_URI}/alojamientos`);
  }

  //Función para enlazar con los datos de un alojamiento
  getAlojamiento(id_alojamiento: number){
    return this.http.get(`${this.API_URI}/alojamiento/${id_alojamiento}`);
  }

}
