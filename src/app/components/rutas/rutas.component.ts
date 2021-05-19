import { Component, Input, OnInit } from '@angular/core';
import { Localizacion } from 'src/app/services/localizaciones.service';
import { rutasDatos, RutasService } from 'src/app/services/rutas.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit {

  @Input() rutas!:rutasDatos;
  @Input() localizaciones!:Localizacion;
  rutasArray: any [] = [];
  numCaracteres:number;

  constructor(
    private _rutasService:RutasService
  ) { 
    this.numCaracteres = 120;
  }

  ngOnInit() {
    this._rutasService.getRutas()
      .subscribe( (item:any) => {
        this.rutasArray = item;
      } )
  }

  public puntos_suspensivos():string{
    if(this.rutas.descripcion.length > this.numCaracteres) return "...";
    return "";
  }

}
