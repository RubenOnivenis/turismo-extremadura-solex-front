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

  localizaciones: any[] = [];

  localizacionesEncontradas: any = [];

  nombre : any;

  isAdmin = false;

  constructor(private _localizacionesService:LocalizacionesService, private activatedRoute: ActivatedRoute, private toastr: ToastrService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.cargar();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargar(){
    this._localizacionesService.getLocalizaciones()
      .subscribe((localizaciones: any) => {
        this.localizaciones = localizaciones;
        console.log(localizaciones);
      });
  }

  buscar(){
    this._localizacionesService.buscarLocalizaciones(this.nombre)
      .subscribe((localizacionesEncontradas: any) => {
        this.localizacionesEncontradas = localizacionesEncontradas;
        console.log(localizacionesEncontradas);
      });
  }

}
