import { LoginGuard } from './components/guards/login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/auth/login.component';
import { RegistroComponent } from './components/auth/registro.component';
import { AlojamientosComponent } from './components/alojamientos/alojamientos.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { LocalizacionesComponent } from './components/localizaciones/localizaciones.component';

const routes: Routes = [
  // Ruta principal del index
  { path: '', component: MenuComponent },
  // Ruta del login
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  // Ruta del registro de usuarios
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
  { path: 'localizaciones', component: LocalizacionesComponent},
  { path: 'alojamientos', component: AlojamientosComponent},
  { path: 'rutas', component: RutasComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
