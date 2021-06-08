import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalizacionesService } from 'src/app/services/localizaciones.service';

@Component({
  selector: 'app-localizaciones',
  templateUrl: './localizaciones.component.html',
  styleUrls: ['./localizaciones.component.css']
})
export class LocalizacionesComponent implements OnInit {

  // Variable para las localizaciones asignada a un any de obj y igualada a un obj
  localizaciones: any[] = [];
  
  // Variable para las localizaciones encontrados asignada a un any y igualada a un obj
  localizacionesEncontradas: any = [];
  
  // Varaible para mostrar una parte u otra
  ver: boolean = false;

  // Servicios necesarios inyectados
  constructor(private activatedRoute:ActivatedRoute,private _localizacionesService:LocalizacionesService) { }

  ngOnInit(): void {
    //Al inicio de la página se ejecuta la funcion
    this.cargar();
  }

  //Funcion para guardar los datos de las localizaciones en un array
  cargar(){
    this._localizacionesService.getLocalizaciones()
      .subscribe((localizaciones: any) => {
        this.localizaciones = localizaciones;
        console.log(this.localizaciones);
      });
  }

  //Funcion para buscar lo que escribas en el formulario de búsqueda
  buscar(nombre:string){
    this.activatedRoute.params.subscribe((resp: any)=>{
      this._localizacionesService.buscarLocalizaciones(nombre)
        .subscribe((localizaciones: any) => {
          this.localizacionesEncontradas = localizaciones;
        });
    })
    this.ver=true;
  }

}
