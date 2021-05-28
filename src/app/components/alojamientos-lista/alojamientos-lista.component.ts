import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from 'src/app/services/alojamientos.service';

@Component({
  selector: 'app-alojamientos-lista',
  templateUrl: './alojamientos-lista.component.html',
  styles: []
})
export class AlojamientosListaComponent implements OnInit {

  alojamientosArray: any [] = [];

  constructor(
    private _alojamientosService:AlojamientosService
  ) { }

  ngOnInit() {
    this._alojamientosService.getAlojamientos()
      .subscribe((alojamientos: any)=>{
        this.alojamientosArray = alojamientos;
      })
  }

}
