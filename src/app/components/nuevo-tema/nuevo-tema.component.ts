import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { temasDatos, TemasService } from 'src/app/services/temas.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-nuevo-tema',
  templateUrl: './nuevo-tema.component.html',
  styleUrls: ['./nuevo-tema.component.css']
})
export class NuevoTemaComponent implements OnInit {

  //Variable asignada a la interfaz de los temas
  tema!:temasDatos;

  //Variable para instanciar el formulario
  forma!:FormGroup;

  //Variables para comprobar el rol del usuario
  isLogged = false;
  isAdmin = false;
  nombreUsuario: string;

  //Variable para guardar los datos del usuario asignada a un any e igualada a un array
  usuario:any = {};

  //Inyectados los servicios necesarios
  constructor(
    private temasService: TemasService, 
    private formBuilder:FormBuilder, 
    private tokenService: TokenService, 
    private _usuariosService: UsuariosService, 
    private router: Router
    ) { 
    //Llamada a la función que instancia el formulario
    this.crearFormulario();
  }

  ngOnInit() {
    //Se iguala para ver si el usuario ha iniciado sesión
    this.isLogged = this.tokenService.isLogged();
    //Se iguala la variable isAdmin al token de login del administrador
    this.isAdmin = this.tokenService.isAdmin();
    //Coger el token del usuario
    this.nombreUsuario = this.tokenService.getUserName();
    //Coger el usuario completo
    this.getUsuario();
  }
  
  //Método para traer los datos del usuario
  getUsuario(){
    this._usuariosService.getUsuario(this.nombreUsuario)
      .subscribe(respuesta => {
        // Guardamos los datos del usuario en la variable usuario declarada como un obj
        this.usuario = respuesta;
      },
      // En caso de error nos saldrá en la consola un aviso: ERROR
      (err) => {
        err="ERROR";
        console.log(err);
      })
  }

  // Función que guarda las validaciones del formulario que añade el tema
  crearFormulario() {
    this.forma = this.formBuilder.group({
      // El nombre del tema es un campo requerido y tiene un validador que le obliga a que mínimo tenga cinco carácteres
      nombreTema : ['', [Validators.required, Validators.minLength(5)]],
      // La descripción del tema es un campo requerido y tiene un validador que le obliga a que mínimo tenga diez carácteres
      comentarioTema : ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  //Función que crea el nuevo tema
  anadirTema(){
    this.rellenarTema();
    this.temasService.anadirTema(this.tema)
      .subscribe(respuesta => {
      });
    //Una vez añadido el tema se redirecciona al foro
    this.router.navigate(['/foro']);
  }

  //Función para rellenar los datos del tema que se va a añadir
  rellenarTema(){
    //Llamada a la función que trae los datos del usuario
    this.getUsuario();
    this.tema={
      nombreTema:this.forma.value.nombreTema,
      comentarioTema:this.forma.value.comentarioTema,
      idUsuario:this.usuario.id,
      fchHoraTema:new Date
    }
  }

  //Función que comprueba si los campos del formulario son válidos
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
