import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { comentariosDatos, temasDatos, TemasService } from 'src/app/services/temas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  // Variable tema tipo any igual a un obj
  tema: any = {};
  // Variable comentarios tipo any igual a un ob
  comentarios: any = {};

  //comentarios: any[] = [];
  comentario!:comentariosDatos;

  constructor(
    private _temaService:TemasService, 
    private _usuarioService:UsuariosService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(){
    this.cargarTema();
    this.cargarComentario();
    //this.cargarComentarios();
  }

  // Mostrar un solo tema
  cargarTema(){
    this._temaService.cargarTema(this.activateRoute.snapshot.params.id_tema)
      .subscribe(respuesta => {
        this.tema = respuesta;
        //console.log(this.tema);
      });
  }

  // Mostrar todos los comentarios
 /* cargarComentarios(){
    this._temaService.cargarComentarios()
      .subscribe(respuesta => {
        this.comentarios = respuesta;
        console.log(this.comentarios);
      });
  }*/

  // Mostrar comentarios según el tema
  cargarComentario(){
    //this.cargarTema();
    this._temaService.cargarComentario(this.activateRoute.snapshot.params.id_tema)
      .subscribe((respuesta : any)=> {
        this.comentarios = respuesta;
        console.log(this.comentarios);
      });
  }

  guardar(){
    this.rellenarComent();
    this._temaService.comentar(this.comentario)
      .subscribe(cliente => {
        this.cargarComentario();
      });
  }

  rellenarComent() {
    
  }

}
