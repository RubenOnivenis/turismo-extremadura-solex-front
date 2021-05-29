import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlojamientosService } from 'src/app/services/alojamientos.service';

@Component({
  selector: 'app-alojamiento',
  templateUrl: './alojamiento.component.html',
  styles: []
})
export class AlojamientoComponent implements OnInit {

  alojamiento: any = {};

  constructor(
    private _alojamientosService: AlojamientosService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAlojamiento();
  }

  getAlojamiento(){
    this._alojamientosService.getAlojamiento(this.activatedRoute.snapshot.params.id)
      .subscribe(respuesta =>{
        this.alojamiento = respuesta;
      }, 
        (err) =>{
          err='ERROR';
          console.log(err);
      });
  }

}
