import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  // Variable comentarios tipo any igual a un array
  comentarios: any = [];

  // Variable usario tipo any igual a un obj
  usuario: any = {};

  // Variable que se iguala a la interfaz con los datos de cada comentario
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
    private _usuariosService: UsuariosService,
    private formBuilder:FormBuilder
  ) { this.crearFormulario();
  }

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
    // Función para traer el usuario
    this.getUsuario();
    // La página inicia mostrando los comentarios de cada tema
    this.cargarComentario();
  }

  // Método para traer los datos del usuario
  getUsuario(){
    // Llamada a la consulta de la API que se encarga de traer los datos del usuario
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
    // Llamada a la consulta de la API que se encarga de traer el tema
    this._temaService.cargarTema(this.activateRoute.snapshot.params.id_tema)
      .subscribe(respuesta => {
        this.tema = respuesta;
      });
  }

  // Mostrar comentarios según el tema
  cargarComentario(){
    // Llamada a la consulta de la API que se encarga de traer el comentario
    this._temaService.cargarComentario(this.activateRoute.snapshot.params.id_tema)
      .subscribe((respuesta : any)=> {
        this.comentarios = respuesta;
        console.log(respuesta);
      });
  }

  // Instanciar el formulario del comentario
  crearFormulario() {
    this.forma = this.formBuilder.group({
      comentarioTema : ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  // Función para añadir comentario
  dejarComentario(){
    //Función que se encarga de rellenar los datos de los comentarios
    this.rellenarComentario();
    // Traemos la llamada a la consulta de la API que se encarga de añadir un comentario
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
      comentario:this.forma.value.comentarioTema,
      id_usuario:this.usuario.id,
      id_tema:this.tema.id_tema,
      fch_hora_comentario:new Date
    }
  }

  // Método para borrar un comentario
  borrarComentario(id_comentario_foro: number){
    // Traemos la llamada a la consulta de la API que se encarga de eliminar el comentario
    this._temaService.eliminarComentario(id_comentario_foro)
      .subscribe(respuesta => {
        // Función que trae el comentario
        this.cargarComentario();
      })
  }

  // Método para comprobar si cada campo de formulario esta valido según las validaciones puestas
  valido(texto:string){
    let elemento:any = this.forma.get(texto);
    if(elemento==null){
      elemento = {
        valid:false,
        untouched:false
      }
    }
    return !(elemento.invalid && elemento.touched);
  }

}