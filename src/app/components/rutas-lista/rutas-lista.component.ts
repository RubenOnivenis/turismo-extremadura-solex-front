import { Component, OnInit } from '@angular/core';
import { RutasService } from 'src/app/services/rutas.service';

@Component({
  selector: 'app-rutas-lista',
  templateUrl: './rutas-lista.component.html',
  styles: []
})
export class RutasListaComponent implements OnInit {

  rutasArray: any [] = [];

  constructor(
    private _rutasService:RutasService
  ) { }

  ngOnInit() {
    this._rutasService.getRutas()
      .subscribe((rutas: any)=>{
        this.rutasArray = rutas;
      })
  }

}
