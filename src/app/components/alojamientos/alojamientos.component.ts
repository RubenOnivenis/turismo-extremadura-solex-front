import { Component, Input, OnInit } from '@angular/core';
import { alojamientosDatos, AlojamientosService } from 'src/app/services/alojamientos.service';
import { localizacionesDatos } from 'src/app/services/localizaciones.service';

@Component({
  selector: 'app-alojamientos',
  templateUrl: './alojamientos.component.html',
  styleUrls: ['./alojamientos.component.css']
})
export class AlojamientosComponent implements OnInit {

  @Input() alojamiento!:alojamientosDatos;
  @Input() localizaciones!:localizacionesDatos;
  alojamientosArray: any [] = [];
  numCaracteres:number;

  constructor(
    private _alojamientosService:AlojamientosService
  ) { 
    this.numCaracteres = 120;
  }

  ngOnInit() {
    this._alojamientosService.getAlojamientos()
      .subscribe( (item:any) => {
        this.alojamientosArray = item;
        console.log(this.alojamientosArray);
      } )
  }

  public puntos_suspensivos():string{
    if(this.alojamiento.descripcion.length > this.numCaracteres) return "...";
    return "";
  }

}
