import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path:'inicio',  component: InicioComponent, pathMatch: 'full'},
  { path:'dashboard', component: DashboardComponent },
  { path:'**', redirectTo:'/dashboard', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
