import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // Variable donde se guarda el nombre de usuario asignada a una cadena
  nombreUsuario: string;

  //Inyectado el servcio del token
  constructor(private tokenService: TokenService) { }

  //Coger el token con el nombre de usuario
  ngOnInit() {
    this.nombreUsuario = this.tokenService.getUserName();
  }

}
