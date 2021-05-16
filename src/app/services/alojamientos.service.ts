import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface alojamientosDatos{
  id_alojamiento?:number,
  id_localizacion?:number,
  imagen:string,
  nombre:string,
  nombreLocalizacion:string,
  descripcion:string
}

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {

  API_URI = 'http://localhost:8081/api';

  constructor(
    private http: HttpClient
  ) { }

getAlojamientos(){
  return this.http.get(`${this.API_URI}/alojamientos`);
}

}
