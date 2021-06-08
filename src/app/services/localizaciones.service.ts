import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Interfaz de los datos de alojamientos
export interface localizacionesDatos{
  id?: number,
  nombre: string,
  provincia: string,
  comarca: string,
  imagen:string,
  url:string
}

@Injectable({
  providedIn: 'root'
})
export class LocalizacionesService {

  //URL por defecto para acceder al back
  API_URI = 'http://localhost:8081/api';

  //Implementación que se usa para poder usar rutas http
  constructor(private http: HttpClient) {}

  //Función para enlazar con el listado de localizaciones
  getLocalizaciones(){
    return this.http.get(this.API_URI+`/localizaciones`);
  }

  //Función para enlazar con la búsqueda de localizaciones
  buscarLocalizaciones(nombre:string){
    return this.http.get(this.API_URI + `/localizaciones/nombre/${nombre}`);
  }
}
