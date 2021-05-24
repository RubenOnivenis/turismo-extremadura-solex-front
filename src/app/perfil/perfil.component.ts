import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario:any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private _usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(){
    this._usuariosService.getUsuario(this.activatedRoute.snapshot.params.id)
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
