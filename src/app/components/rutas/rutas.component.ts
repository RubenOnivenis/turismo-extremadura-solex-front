import { Component, Input, OnInit } from '@angular/core';
import { rutasDatos } from 'src/app/services/rutas.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit {
  
  //Comunica este componente con su interfaz
  @Input() ruta!:rutasDatos;

  //Variable con el numero de caracteres que se van a mostrar
  NUM_CARACTERES:number;

  constructor( ) { 
    //Inicialización de la variable de los caracteres que se van a mostrar
    this.NUM_CARACTERES = 120;
  }

  ngOnInit() {
    
  }

  //Función para añadir puntos suspensivos cuando la descripción es demasiado larga
  public puntos_suspensivos():string{
    if(this.ruta.descripcion.length > this.NUM_CARACTERES) return "...";
    return "";
  }

}
