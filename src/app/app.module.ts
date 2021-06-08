import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { interceptorProvider } from './components/interceptors/prod-interceptor.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/auth/login.component';
import { RegistroComponent } from './components/auth/registro.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AlojamientosComponent } from './components/alojamientos/alojamientos.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { LocalizacionesComponent } from './components/localizaciones/localizaciones.component';
import { NoImagePipePipe } from './pipes/no-image-pipe.pipe';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NuevoTemaComponent } from './components/nuevo-tema/nuevo-tema.component';
import { ForoComponent } from './components/foro/foro.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { CookiesComponent } from './components/shared/cookies/cookies.component';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AlojamientosListaComponent } from './Components/alojamientos-lista/alojamientos-lista.component';
import { RutasListaComponent } from './Components/rutas-lista/rutas-lista.component';

//Declaración de los módulos necesarios en la aplicación
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    MenuComponent,
    FooterComponent,
    AlojamientosComponent,
    RutasComponent,
    LocalizacionesComponent,
    NoImagePipePipe,
    PerfilComponent,
    NuevoTemaComponent,
    ForoComponent,
    ComentariosComponent,
    CookiesComponent,
    AlojamientosListaComponent,
    RutasListaComponent
  ],
  //Importaciones necesarias en la aplicación
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  //Proveedores necesarias en la aplicación
  providers: [
    interceptorProvider,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
