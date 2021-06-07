import { LoginGuard } from './components/guards/login.guard';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/auth/login.component';
import { RegistroComponent } from './components/auth/registro.component';
import { AlojamientosComponent } from './components/alojamientos/alojamientos.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { LocalizacionesComponent } from './components/localizaciones/localizaciones.component';
import { NuevoTemaComponent } from './components/nuevo-tema/nuevo-tema.component';
import { ForoComponent } from './components/foro/foro.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AlojamientosListaComponent } from './Components/alojamientos-lista/alojamientos-lista.component';
import { RutasListaComponent } from './Components/rutas-lista/rutas-lista.component';
import { NuevoComentarioComponent } from './components/nuevo-comentario/nuevo-comentario.component';

const routes: Routes = [
  // Ruta principal del index
  { path: '', component: MenuComponent },
  // Ruta del login
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  // Ruta del registro de usuarios
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
  // Rutas del navbar
  { path: 'localizaciones', component: LocalizacionesComponent},
  //{ path: 'alojamientos', component: AlojamientosComponent},
  { path: 'alojamientos-lista', component: AlojamientosListaComponent},
  //{ path: 'rutas', component: RutasComponent},
  { path: 'rutas-lista', component: RutasListaComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'foro', component: ForoComponent},
  { path: 'nuevo-post', component: NuevoTemaComponent},
  { path: 'comentarios/:id_tema', component: ComentariosComponent},
  { path: 'nuevo-comentario/:id_tema', component: NuevoComentarioComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
