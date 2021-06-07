import { Component, Input, OnInit } from '@angular/core';
import { alojamientosDatos, AlojamientosService } from 'src/app/services/alojamientos.service';

@Component({
  selector: 'app-alojamientos',
  templateUrl: './alojamientos.component.html',
  styleUrls: ['./alojamientos.component.css']
})
export class AlojamientosComponent implements OnInit {

  //Comunica este componente con su interfaz
  @Input() alojamiento!:alojamientosDatos;
  
  //Variable con el numero de caracteres que se van a mostrar
  NUM_CARACTERES:number;

  constructor() { 
    //Inicialización de la variable de los caracteres que se van a mostrar
    this.NUM_CARACTERES = 120;
  }

  ngOnInit() {
    
  }

  //Función para añadir puntos suspensivos cuando la descripción es demasiado larga
  public puntos_suspensivos():string{
    if(this.alojamiento.descripcion.length > this.NUM_CARACTERES) return "...";
    return "";
  }

}
