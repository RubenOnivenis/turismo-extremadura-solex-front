import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalizacionesService } from 'src/app/services/localizaciones.service';

@Component({
  selector: 'app-localizaciones',
  templateUrl: './localizaciones.component.html',
  styleUrls: ['./localizaciones.component.css']
})
export class LocalizacionesComponent implements OnInit {

  localizacionesEncontradas: any = [];

  constructor(private _localizacionesService:LocalizacionesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((resp: any)=>{
      this._localizacionesService.buscarLocalizaciones(resp.nombre)
        .subscribe((localizaciones: any) => {
          this.localizacionesEncontradas = localizaciones;
        });
    })
  }

}
