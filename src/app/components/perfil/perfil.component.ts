import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  isLogged = false;
  isAdmin = false;
  nombreUsuario: string;

  usuario:any = {};

  constructor(
    private _usuariosService: UsuariosService,
    private tokenService: TokenService
  ) {}

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
        console.log(this.usuario);
      },
      (err) => {
        err="ERROR";
        console.log(err);
      })
  }
}
