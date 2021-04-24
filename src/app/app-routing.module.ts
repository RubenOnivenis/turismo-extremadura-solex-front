import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { ProdGuardService } from './guards/prod-guard.service';



const routes: Routes = [
  // Ruta principal del index
  { path: '', component: IndexComponent },
  // Ruta del login
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  // Ruta del registro de usuarios
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
