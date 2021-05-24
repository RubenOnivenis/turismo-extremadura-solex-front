import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { temasDatos, TemasService } from 'src/app/services/temas.service';

@Component({
  selector: 'app-nuevo-tema',
  templateUrl: './nuevo-tema.component.html',
  styleUrls: ['./nuevo-tema.component.css']
})
export class NuevoTemaComponent implements OnInit {

  tema!:temasDatos;

  forma!:FormGroup;

  constructor(
    private temasService: TemasService, private formBuilder:FormBuilder,
  ) { 
    this.crearFormulario();
  }

  ngOnInit() {
  }

  crearFormulario() {
    this.forma = this.formBuilder.group({
    
    });
  }

  anadirTema(){
    this.rellenarTema();
    this.temasService.anadirTema(this.tema)
      .subscribe(usuario => {
      });
  }

  rellenarTema(){
    this.tema={
      nombreTema:this.forma.value.nombre,
      id_usuario:1,
      fch_hora_tema:new Date,
      comentario_tema:this.forma.value.descr
    }
  }

}
