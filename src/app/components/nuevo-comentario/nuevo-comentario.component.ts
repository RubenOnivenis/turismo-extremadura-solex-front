import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { comentariosDatos, TemasService } from 'src/app/services/temas.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-nuevo-comentario',
  templateUrl: './nuevo-comentario.component.html',
  styleUrls: ['./nuevo-comentario.component.css']
})
export class NuevoComentarioComponent implements OnInit {

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

  constructor( // Servicio de los temas
    private _temaService:TemasService,
    private tokenService:TokenService,
    private activateRoute: ActivatedRoute,
    private _usuariosService: UsuariosService,
    private formBuilder:FormBuilder
  ) { this.crearFormulario();
  }

  ngOnInit() {
    // Se iguala la variable isLogged al token de login del usuario
    this.isLogged = this.tokenService.isLogged();
    // Se iguala la variable isAdmin al token de login del administrador
    this.isAdmin = this.tokenService.isAdmin();
    //Coger el token del usuario
    this.nombreUsuario = this.tokenService.getUserName();
    // Función que trae los datos del usuario
    this.getUsuario();
    // La página inicia mostrando los temas
    this.cargarTema();  
  }

  // Método para traer los datos del usuario
  getUsuario(){
    // Llamada a la consulta de la API que se encarga de traer los datos del usuario
    this._usuariosService.getUsuario(this.nombreUsuario)
      .subscribe(respuesta => {
        this.usuario = respuesta;
        console.log(this.usuario.id)
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
        console.log(this.tema.id_tema);
      });
  }

  // Instanciar el formulario del comentario
  crearFormulario() {
    this.forma = this.formBuilder.group({
      comentarioTema : ['']
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
    // Obj del comentario rellenando los datos del comentario
    this.comentario={
      comentario:this.forma.value.comentarioTema,
      id_usuario:this.usuario.id,
      id_tema:this.tema.id_tema,
      fch_hora_comentario:new Date
    }
    console.log(this.comentario);
  }

}
