import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from 'src/app/services/alojamientos.service';

@Component({
  selector: 'app-alojamientos-lista',
  templateUrl: './alojamientos-lista.component.html',
  styles: []
})
export class AlojamientosListaComponent implements OnInit {

  //Variable que se iguala a un obj
  alojamientosArray: any [] = [];

  constructor(
    //Servicio de los alojamientos
    private _alojamientosService:AlojamientosService
  ) { }

  ngOnInit() {
    //Función para que traiga todos los datos de los alojamientos de la BBDD
    this._alojamientosService.getAlojamientos()
      .subscribe((alojamientos: any)=>{
        this.alojamientosArray = alojamientos;
      })
  }

}
