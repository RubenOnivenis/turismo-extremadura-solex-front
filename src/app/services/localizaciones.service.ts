import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Localizacion{
  id?: number,
  nombre: string,
  provincia: string,
  comarca: string,
  imagen:string
}

@Injectable({
  providedIn: 'root'
})
export class LocalizacionesService {

  localizacionesURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getLocalizaciones(){
    return this.http.get(this.localizacionesURL+`/localizaciones`);
  }

  buscarLocalizaciones(nombre:string){
    return this.http.get(this.localizacionesURL + `/nombre/${nombre}`);
  }
}
