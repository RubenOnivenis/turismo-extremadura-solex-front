import { Component, OnInit } from '@angular/core';
import { TemasService } from 'src/app/services/temas.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {

  // Variables necesarias ambas a false
  isLogged = false;
  isAdmin = false;
  public temas;

  // Inyectamos en el constructor el servicio de Token
  constructor(private tokenService: TokenService, private temasService: TemasService) { }

  ngOnInit() {
    // Se iguala la variable isLogged al token de login del usuario
    this.isLogged = this.tokenService.isLogged();
    // Se iguala la variable isAdmin al token de login del administrador
    this.isAdmin = this.tokenService.isAdmin();
    // Cargar todos los temas del foro
    this.temasService.cargarTemas()
      .subscribe(resp =>{
        this.temas=resp;
        
      });
  }

}
