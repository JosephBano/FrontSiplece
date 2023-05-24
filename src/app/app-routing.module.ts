import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CrudInstitucionesComponent } from './components/dashboard/instituciones/crud-instituciones/crud-instituciones.component';
import { CrudModeloComponent } from './components/dashboard/modelo/crud-modelo/crud-modelo.component';

const routes: Routes = [
  { path:'dashboard', component: DashboardComponent },
  { path: 'Instituciones', component: CrudInstitucionesComponent},
  { path: 'Modelos', component: CrudModeloComponent},
  { path:'', redirectTo:'/dashboard', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
