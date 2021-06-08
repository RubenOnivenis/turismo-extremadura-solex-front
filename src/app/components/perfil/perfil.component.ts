import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  // Variable para saber si el usuario esta loggeado a false
  isLogged = false;
  // Variable para saber si el admin esta loggeado a false
  isAdmin = false;
  // Variable del nombre del usuario tipo string
  nombreUsuario: string;

  // Varible tipo formGroup para los validadores de los datos del usuario
  forma_modificar!: FormGroup;

  // Variable tipo any igualada a un obj
  usuario:any = {};
  // Variable tipo any igualada a un obj
  usuarioEnviar:any = {};

  // Constructor
  constructor(
    // Servicios de la aplicación
    // Servicio del usuario
    private _usuariosService: UsuariosService,
    // Servicio del token
    private tokenService: TokenService,
    // Funcionalidades de los formBuilder
    private formBuilder:FormBuilder
  ) {
    // Llamamos a la función formulario_modificar()
    this.formulario_modificar();
  }

  // Funciones que realiza la aplicación al inicializar esta página
  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    // Se iguala la variable isAdmin al token de login del administrador
    this.isAdmin = this.tokenService.isAdmin();
    // Coger el token del usuario
    this.nombreUsuario = this.tokenService.getUserName();
    // Llamamos a la función que trae los datos del usuario
    this.getUsuario();
  }

  // Función que trae los datos del usuario
  getUsuario(){
    // Llamamos a la consulta de la API que se encarga de traer los datos del usuario
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

  // Función que guarda las validaciones del formulario que modifica los datos del usuario
  formulario_modificar(){
    this.forma_modificar = this.formBuilder.group({
      // El email es requerido y se ha utilizado Validators.email que es una expresión regular para validar el email
      // Es necesario que el email esté escrito
      email:['', [Validators.required, Validators.email]],
      // El nombre de usuario no tiene validaciones puesto que este dato no se cambia
      nombre_usuario: [''],
      // El nombre es un campo requerido y tiene un validador que le obliga a que mínimo tenga tres carácteres
      nombre:['', [Validators.required, Validators.minLength(3)]],
      // El apellido es requerido y tiene un validador que le obliga a que mínimo tenga cinco carácteres
      apellidos:['', [Validators.required, Validators.minLength(5)]],
      // La fecha de nacimiento no tiene validadores puesto que no es un campo requerido
      fch_nacimiento:[''],
      // El telefono tiene como un validador una expresión regular para los números de teléfono
      telefono: ['', Validators.pattern("[0-9]{9}")],                                     
    })
  }

  // Método para modificar usuarios
  modificar(){
    // Llamada a la función de la recursva para modificar a la cual le pasamos la variable forma_modificar
    this.recursivaModificar(this.forma_modificar);
    // Llamada a la función para rellenar usuarios
    this.rellenarUsuarios();
    // Llamada a la función modificar usuario
    this.modificarUsuario();
    // Al modificar se recarga la página
    location.reload();
    
  }

  // Función recursiva para modificar 
  recursivaModificar(item: FormGroup): any{
    // Si hay algún form group dentro de otros se encarga de recorrerlos para que sean validados también
    Object.values(item.controls).forEach(control =>{
      if(control instanceof FormGroup) this.recursivaModificar(control);
      control.markAsTouched()});
    return;
  }

  // Función para rellenar los datos del usuario con los valores de los campos
  rellenarUsuarios(){
    this.usuarioEnviar.email = this.forma_modificar.value.email;
    this.usuarioEnviar.nombre_usuario = this.forma_modificar.value.nombre_usuario;
    this.usuarioEnviar.nombre = this.forma_modificar.value.nombre;
    this.usuarioEnviar.apellidos = this.forma_modificar.value.apellidos;
    this.usuarioEnviar.fch_nacimiento = this.forma_modificar.value.fch_nacimiento;
    this.usuarioEnviar.telefono = this.forma_modificar.value.telefono;
  }

  // Función para modificar el usuario
  modificarUsuario(){
    // Se realiza una llamada a la consulta de la API que se encarga de la modificación de usuarios
    this._usuariosService.updateUsuario(this.nombreUsuario, this.usuarioEnviar)
      .subscribe(respuesta =>{
      },
      // En caso de que falle devuelve en la consola: ERROR
        (err) => {
          err="ERROR";
          console.log(err);
        } 
      )
  }

  //Función que comprueba si los campos del formulario son válidos
  valido(texto:string){
    let elemento:any = this.forma_modificar.get(texto);
    if(elemento==null){
      elemento = {
        valid:false,
        untouched:false
      }
    }
    return !(elemento.invalid && elemento.touched);
  }
}
