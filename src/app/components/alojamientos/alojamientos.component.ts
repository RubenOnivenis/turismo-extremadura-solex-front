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
  
  NUM_CARACTERES:number;

  constructor(
    
  ) { 
    this.NUM_CARACTERES = 120;
  }

  ngOnInit() {
    
  }

  public puntos_suspensivos():string{
    if(this.alojamiento.descripcion.length > this.NUM_CARACTERES) return "...";
    return "";
  }

}
