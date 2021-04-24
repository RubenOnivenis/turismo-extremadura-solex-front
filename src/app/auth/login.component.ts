import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';

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
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
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

}
