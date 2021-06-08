import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // Variables necesarias para logearse
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;

  // Variable para el mensaje de error
  errMsj: string;

  // Inyectamos en el constructor los servicios necesarios y Router
  constructor(
    // Implementación del servicio del token
    private tokenService: TokenService,
    // Implementación del servicio de autenticación
    private authService: AuthService,
    // Implementación para poder redireccionar a otra URL
    private router: Router,
    // Implementación del servicio de Toastr
    private toastr: ToastrService
  ) { }

  ngOnInit() {}

  onLogin(): void {
    // Inicializar el loginUsuario, se le pasa el nombre de usuario y el password
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    // Una vez que lo tenemos se lo pasamos al authService
    // Se realiza un callback, en el caso de que fallara sucedería el err, si todo va bien sucedería el data
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.recargar();
        this.router.navigate(['/']);
      },
      err => {
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  //Función que recarga la pagina
  recargar(){
    location.reload();
  }
}


