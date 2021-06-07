import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private temasService: TemasService, 
    private formBuilder:FormBuilder, 
    private tokenService: TokenService, 
    private _usuariosService: UsuariosService, 
    private router: Router
    ) { 
    this.crearFormulario();
  }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    // Se iguala la variable isAdmin al token de login del administrador
    this.isAdmin = this.tokenService.isAdmin();
    //Coger el token del usuario
    this.nombreUsuario = this.tokenService.getUserName();
    //Coger el usuario completo
    this.getUsuario();
  }
  
  // Método para traer los datos del usuario
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

  // Instanciar el formulario del nuevo tema
  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombreTema : ['', [Validators.required, Validators.minLength(5)]],
      comentarioTema : ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  anadirTema(){
    this.rellenarTema();
    this.temasService.anadirTema(this.tema)
      .subscribe(respuesta => {
      });
    this.router.navigate(['/foro']);
  }

  rellenarTema(){
    this.getUsuario();
    this.tema={
      nombreTema:this.forma.value.nombreTema,
      comentarioTema:this.forma.value.comentarioTema,
      idUsuario:this.usuario.id,
      fchHoraTema:new Date
    }
  }

  valido(texto:string){
    let elemento:any = this.forma.get(texto);
    if(elemento==null){
      elemento = {
        valid:false,
        untouched:false
      }
    }
    return !(elemento.invalid && elemento.touched);
  }

}
