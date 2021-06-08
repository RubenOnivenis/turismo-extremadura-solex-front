import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

//Implementa OnInit que sirve para que se una vez abres la página por primera vez
export class NavbarComponent implements OnInit {

  // Variables necesarias ambas a false
  isLogged = false;
  isAdmin = false;
  nombreUsuario: string;

  // Inyectamos en el constructor el servicio de Token
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    // Se iguala la variable isLogged al token de login del usuario
    this.isLogged = this.tokenService.isLogged();
    // Se iguala la variable isAdmin al token de login del administrador
    this.isAdmin = this.tokenService.isAdmin();
    //Coger el token del usuario
    this.nombreUsuario = this.tokenService.getUserName();
  }

  //Función para cerrar sesión
  onLogOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

}
