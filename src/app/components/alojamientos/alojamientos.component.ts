import { Component, Input, OnInit } from '@angular/core';
import { alojamientosDatos, AlojamientosService } from 'src/app/services/alojamientos.service';
import { Localizacion } from 'src/app/services/localizaciones.service';

@Component({
  selector: 'app-alojamientos',
  templateUrl: './alojamientos.component.html',
  styleUrls: ['./alojamientos.component.css']
})
export class AlojamientosComponent implements OnInit {

  @Input() alojamientos!:alojamientosDatos;
  @Input() localizaciones!:Localizacion;
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
      } )
  }

  public puntos_suspensivos():string{
    if(this.alojamientos.descripcion.length > this.numCaracteres) return "...";
    return "";
  }

}
