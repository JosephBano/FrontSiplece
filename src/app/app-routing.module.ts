import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CrudInstitucionesComponent } from './components/dashboard/instituciones/crud-instituciones/crud-instituciones.component';
import { CrudModelosComponent } from './components/dashboard/instituciones/modelos/crud-modelos/crud-modelos.component';

const routes: Routes = [
  { path:'dashboard', component: DashboardComponent },
  { path: 'Instituciones', component: CrudInstitucionesComponent},
  { path: 'Modelos', component: CrudModelosComponent},
  { path:'', redirectTo:'/dashboard', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
