import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  // Variables necesarias para el registro de usuario
  nuevoUsuario: NuevoUsuario;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  apellidos: string;
  fch_nacimiento: Date;
  imagen_perfil: Blob;
  telefono: string;

  // Variable para mensaje de error
  errMsj: string;

  // Inyectamos los servicios en el constructor
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  // Función para registrar al usuario
  onRegister(): void {
    // Inicializamos el nuevo usuario le pasamos las variables para crear el usuario, nombre, nombreUsuario, email y password
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password, this.apellidos, this.fch_nacimiento, this.imagen_perfil, this.telefono);
    // Una vez que lo tenemos se lo pasamos al authService
    // Se realiza un callback, en el caso de que fallara sucedería el err, si todo va bien sucedería el data
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        this.toastr.success('Cuenta Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

}
