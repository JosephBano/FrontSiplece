import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleIndicadorComponent } from './components/dashboard/selects/detalle-indicador/detalle-indicador.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { SelectsComponent } from './components/dashboard/selects/selects.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path:'inicio',  component: InicioComponent, children: [
    { path: '', component: LoginComponent},
  ]},
  { path:'dashboard', component: DashboardComponent, children: [
    { path: '', component: SelectsComponent},
    { path: 'detalle', component: DetalleIndicadorComponent},
  ]},
  { path:'**', redirectTo:'/dashboard', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
