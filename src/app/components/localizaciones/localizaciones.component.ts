import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalizacionesService } from 'src/app/services/localizaciones.service';
import { TokenService } from 'src/app/services/token.service';

const TOKEN_KEY = 'AuthToken';

@Component({
  selector: 'app-localizaciones',
  templateUrl: './localizaciones.component.html',
  styleUrls: ['./localizaciones.component.css']
})
export class LocalizacionesComponent implements OnInit {

  //Variables para guardar los datos traidos de la bbdd
  localizaciones: any[] = [];

  localizacionesEncontradas: any = [];

  constructor(private activatedRoute:ActivatedRoute,private _localizacionesService:LocalizacionesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    //Al inicio de la página se ejecuta la funcion
    this.cargar();
  }

  //Funcion para guardar los datos de las localizaciones en un array
  cargar(){
    this._localizacionesService.getLocalizaciones()
      .subscribe((localizaciones: any) => {
        this.localizaciones = localizaciones;
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
  }

}
