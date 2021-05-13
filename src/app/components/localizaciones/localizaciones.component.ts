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

  localizacionesEncontradas: any[] = [];

  nombre : any;

  // Variables necesarias ambas a false
  isLogged = false;
  isAdmin = false;

  constructor(private _localizacionesService:LocalizacionesService, private toastr: ToastrService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    // Se iguala la variable isLogged al token de login del usuario
    this.isLogged = this.tokenService.isLogged();
    // Se iguala la variable isAdmin al token de login del administrador
    this.isAdmin = this.tokenService.isAdmin();
    //Al inicio de la página se ejecuta la funcion
    this.cargar();
  }

  //Funcion para guardar los datos de las localizaciones en un array
  cargar(){
    this._localizacionesService.getLocalizaciones()
      .subscribe((localizaciones: any) => {
        this.localizaciones = localizaciones;
        console.log(localizaciones);
      });
  }

  //Funcion para buscar lo que escribas en el formulario de búsqueda
  buscar(){
    this._localizacionesService.buscarLocalizaciones(this.nombre)
      .subscribe((localizacionesEncontradas: any) => {
        this.localizaciones = localizacionesEncontradas;
        console.log(this.localizaciones);
      });
  }

}
