import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  
  temas: any[] = [];

  temasEncontrados: any = [];

  ver: boolean = false;

  // Inyectamos en el constructor el servicio de Token
  constructor(private tokenService: TokenService, private temasService: TemasService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    // Se iguala la variable isLogged al token de login del usuario
    this.isLogged = this.tokenService.isLogged();
    // Se iguala la variable isAdmin al token de login del administrador
    this.isAdmin = this.tokenService.isAdmin();
    //Al inicio se ejecuta la función
    this.cargar();
  }

  //Cargar todos los temas del foro
  cargar(){
    // Llamada a la consulta de la API que traemos todos los temas
    this.temasService.cargarTemas()
      .subscribe((temas: any) => {
        this.temas = temas;
      });
  }

  //Funcion para buscar lo que escribas en el formulario de búsqueda
  buscarTema(nombre:string){
    this.activatedRoute.params.subscribe((resp: any)=>{
      this.temasService.buscarTema(nombre)
        .subscribe((temasEncontrados: any) => {
          this.temasEncontrados = temasEncontrados;
        });
    })
    this.ver=true;
  }

}
