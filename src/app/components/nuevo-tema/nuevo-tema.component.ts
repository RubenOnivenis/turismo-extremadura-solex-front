import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  tema!:temasDatos;

  forma!:FormGroup;

  isLogged = false;
  isAdmin = false;
  nombreUsuario: string;

  usuario:any = {};

  constructor(
    private temasService: TemasService, private formBuilder:FormBuilder, private tokenService: TokenService, private _usuariosService: UsuariosService,
  ) { 
    this.crearFormulario();
  }

  ngOnInit() {
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
        console.log(this.usuario);
      },
      (err) => {
        err="ERROR";
        console.log(err);
      })
  }

  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombreTema : [''],
      idUsuario : [''],
      comentarioTema : ['']
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
      comentarioTema:this.forma.value.descr,
      idUsuario:this.usuario.id
    }
  }

}
