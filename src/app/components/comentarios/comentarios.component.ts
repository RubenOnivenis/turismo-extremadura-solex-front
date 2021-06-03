import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { comentariosDatos, temasDatos, TemasService } from 'src/app/services/temas.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  // Variable tema tipo any igual a un obj
  tema: any = {};
  // Variable comentarios tipo any igual a un obj
  comentarios: any = {};

  // Variable usario tipo any igual a un obj
  usuario:any = {};

  // 
  comentario!:comentariosDatos;

  // Variables necesarias ambas a false
  isLogged = false;
  isAdmin = false;
  nombreUsuario: string;

  // Variable forma de tipo FormGroup
  forma!:FormGroup;

  constructor(
    // Servicio de los temas
    private _temaService:TemasService,
    private tokenService:TokenService,
    private activateRoute: ActivatedRoute,
    private _usuariosService: UsuariosService
  ) { }

  // Inicio de la página
  ngOnInit(){
    // Se iguala la variable isLogged al token de login del usuario
    this.isLogged = this.tokenService.isLogged();
    // Se iguala la variable isAdmin al token de login del administrador
    this.isAdmin = this.tokenService.isAdmin();
    //Coger el token del usuario
    this.nombreUsuario = this.tokenService.getUserName();
    // La página inicia mostrando los temas
    this.cargarTema();
    // La página inicia mostrando los comentarios de cada tema
    this.cargarComentario();
  }

  // Método para traer los datos del usuario
  getUsuario(){
    this._usuariosService.getUsuario(this.nombreUsuario)
      .subscribe(respuesta => {
        this.usuario = respuesta;
      },
      (err) => {
        err="ERROR";
        console.log(err);
      })
  }

  // Mostrar un solo tema
  cargarTema(){
    this._temaService.cargarTema(this.activateRoute.snapshot.params.id_tema)
      .subscribe(respuesta => {
        this.tema = respuesta;
      });
  }

  // Mostrar comentarios según el tema
  cargarComentario(){
    this._temaService.cargarComentario(this.activateRoute.snapshot.params.id_tema)
      .subscribe((respuesta : any)=> {
        this.comentarios = respuesta;
      });
  }

  // Función para añadir comentario
  dejarComentario(){
    this.rellenarComentario();
    this._temaService.comentar(this.comentario)
      .subscribe(respuesta => {
       
      });
  }

  // Rellenar los datos del comentario con los valores del formulario
  rellenarComentario() {
    // Función que trae los datos del usuario
    this.getUsuario();
    // Función que trae los datos del tema
    this.cargarTema();
    // Obj del comentario rellenando los datos del comentario
    this.comentario={
      comentario:this.forma.value.comentario,
      id_usuario:this.usuario.id,
      id_tema:this.tema.id_tema,
      fch_hora_comentario:new Date
    }
  }

}
