import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styles: []
})

//Implementa OnInit que sirve para que se una vez abres la página por primera vez
export class CookiesComponent implements OnInit {

  //Variables para que se vea la cookie o no
  visible: boolean = true;
  cookieExist!:boolean;
  @Output() close: EventEmitter<any> = new EventEmitter();

  //Servicio de la cookie
  constructor(private _cookieService: CookieService) { }

  //Comprobación de la cookie
  ngOnInit(): void {
    this.cookieExist = this._cookieService.check('CookieSolex');
  }

  //Función para gestionar la cookie
  gestionarCookie(){
    this._cookieService.set('CookieSolex', 'Valor de la cookie');
    this._cookieService.get('CookieSolex');
  }

  //Función para aceptar la cookie y que no vuelva a aparecer
  aceptarCookies(){
    this.gestionarCookie();
    this.visible = !this.visible;
    if(this.visible){
      this.close.emit(null);
    }
  }
}
