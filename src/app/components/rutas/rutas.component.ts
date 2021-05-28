import { Component, Input, OnInit } from '@angular/core';
import { localizacionesDatos } from 'src/app/services/localizaciones.service';
import { rutasDatos, RutasService } from 'src/app/services/rutas.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit {

  @Input() ruta!:rutasDatos;
  @Input() localizaciones!:localizacionesDatos;

  NUM_CARACTERES:number;

  constructor(
    
  ) { 
    this.NUM_CARACTERES = 120;
  }

  ngOnInit() {
    
  }

  public puntos_suspensivos():string{
    if(this.ruta.descripcion.length > this.NUM_CARACTERES) return "...";
    return "";
  }

}
