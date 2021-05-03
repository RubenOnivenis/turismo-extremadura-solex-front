import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Variables necesarias ambas a false
  isLogged = false;
  isAdmin = false;

  // Inyectamos en el constructor el servicio de Token
  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    // Se iguala la variable isLogged al token de login del usuario
    this.isLogged = this.tokenService.isLogged();
    // Se iguala la variable isAdmin al token de login del administrador
    this.isAdmin = this.tokenService.isAdmin();
  }

  //Función para cerrar sesión
  onLogOut(): void {
    this.tokenService.logOut();
  }

}