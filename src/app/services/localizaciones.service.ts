import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionesService {

  localizacionesURL = 'http://localhost:8080/api/localizaciones';

  constructor(private http: HttpClient) {}

  buscarLocalizaciones(nombre:string){
    return this.http.get(this.localizacionesURL + `/nombre/${nombre}`);
  }
}
