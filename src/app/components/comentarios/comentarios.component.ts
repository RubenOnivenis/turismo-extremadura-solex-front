import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { comentariosDatos, temasDatos, TemasService } from 'src/app/services/temas.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  tema: any = {};

  comentarios: any[] = [];
  comentario!:comentariosDatos;

  constructor(private temaService:TemasService, private activateRoute: ActivatedRoute) { }

  ngOnInit(){
    this.cargarTema;
    this.cargarComentarios;
  }

  cargarTema(){
    this.temaService.cargarTema(this.activateRoute.snapshot.params.id_tema)
      .subscribe(tema => {
        this.tema = tema;
        console.log(this.tema);
      });
  }

  cargarComentarios(){
    this.temaService.cargarComentarios(this.activateRoute.snapshot.params.id_tema)
      .subscribe((comentario : any)=> {
        this.comentarios = comentario;
      });
  }

  guardar(){
    this.rellenarComent();
    this.temaService.comentar(this.comentario)
      .subscribe(cliente => {
        this.cargarComentarios();
      });
  }

  rellenarComent() {
    
  }

}
