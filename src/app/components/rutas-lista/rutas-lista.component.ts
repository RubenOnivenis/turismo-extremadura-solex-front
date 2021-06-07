import { Component, OnInit } from '@angular/core';
import { RutasService } from 'src/app/services/rutas.service';

@Component({
  selector: 'app-rutas-lista',
  templateUrl: './rutas-lista.component.html',
  styles: []
})
export class RutasListaComponent implements OnInit {

  //Variable que se iguala a un obj
  rutasArray: any [] = [];

  constructor(
    //Servicio de las rutas
    private _rutasService:RutasService
  ) { }

  ngOnInit() {
    //Función para que traiga todos los datos de las rutas de la BBDD
    this._rutasService.getRutas()
      .subscribe((rutas: any)=>{
        this.rutasArray = rutas;
      })
  }

}
