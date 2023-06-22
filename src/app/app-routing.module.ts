import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleIndicadorComponent } from './components/dashboard/selector/detalle-indicador/detalle-indicador.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { SelectorComponent } from './components/dashboard/selector/selector.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path:'inicio',  component: InicioComponent, children: [
    { path: '', component: LoginComponent},
  ]},
  { path:'dashboard', component: DashboardComponent, children: [
    { path: '', component: SelectorComponent},
    { path: 'detalle/:id', component: DetalleIndicadorComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
