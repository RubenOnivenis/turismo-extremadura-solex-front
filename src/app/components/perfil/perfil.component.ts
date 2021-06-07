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

  forma_modificar!: FormGroup;
  forma_modificar_pass!: FormGroup;

  usuario:any = {};
  usuarioEnviar:any = {};

  constructor(
    private _usuariosService: UsuariosService,
    private tokenService: TokenService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder
  ) {
    this.formulario_modificar();
  }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    // Se iguala la variable isAdmin al token de login del administrador
    this.isAdmin = this.tokenService.isAdmin();
    //Coger el token del usuario
    this.nombreUsuario = this.tokenService.getUserName();
    this.getUsuario();
  }

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

  formulario_modificar(){
    this.forma_modificar = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      nombre_usuario: [''],
      nombre:['', [Validators.required, Validators.minLength(3)]],
      apellidos:['', [Validators.required, Validators.minLength(5)]],
      fch_nacimiento:[''],
      telefono: ['', Validators.pattern("[0-9]{9}")],                                     
    })
  }

  modificar(){
    this.recursivaModificar(this.forma_modificar);
    this.rellenarUsuarios();
    this.modificarUsuario();
    location.reload();
    
  }

  recursivaModificar(item: FormGroup): any{
    Object.values(item.controls).forEach(control =>{
      if(control instanceof FormGroup) this.recursivaModificar(control);
      control.markAsTouched()});
    return;
  }

  rellenarUsuarios(){
    this.usuarioEnviar.email = this.forma_modificar.value.email;
    this.usuarioEnviar.nombre_usuario = this.forma_modificar.value.nombre_usuario;
    this.usuarioEnviar.nombre = this.forma_modificar.value.nombre;
    this.usuarioEnviar.apellidos = this.forma_modificar.value.apellidos;
    this.usuarioEnviar.fch_nacimiento = this.forma_modificar.value.fch_nacimiento;
    this.usuarioEnviar.telefono = this.forma_modificar.value.telefono;
  }

  modificarUsuario(){
    this._usuariosService.updateUsuario(this.nombreUsuario, this.usuarioEnviar)
      .subscribe(respuesta =>{
      },
        (err) => {
          err="ERROR";
          console.log(err);
        } 
      )
  }

  modificar_pass(){
    this.recursivaModificar(this.forma_modificar_pass);
    this.rellenarPass();
    this.modificarPass();
    location.reload();
  }

  formulario_modificar_pass(){
    this.forma_modificar_pass = this.formBuilder.group({
      password:['', Validators.required],                                
    })
  }

  rellenarPass(){
    this.usuarioEnviar.password = this.forma_modificar_pass.value.password;
  }

  modificarPass(){
    this._usuariosService.updatePassUsuario(this.activatedRoute.snapshot.params.id, this.usuarioEnviar)
      .subscribe(respuesta =>{
      },
        (err) => {
          err="ERROR";
          console.log(err);
        } 
      )
  }

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
