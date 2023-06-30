import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleIndicadorComponent } from './components/dashboard/selector/detalle-indicador/detalle-indicador.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { SelectorComponent } from './components/dashboard/selector/selector.component';
import { PanelComponent } from './components/panel/panel.component';
import { InstitucionComponent } from './components/panel/institucion/institucion.component';
import { ModeloComponent } from './components/panel/modelo/modelo.component';
import { CriterioComponent } from './components/panel/criterio/criterio.component';
import { SubCriterioComponent } from './components/panel/sub-criterio/sub-criterio.component';
import { IndicadoresComponent } from './components/panel/indicadores/indicadores.component';

const routes: Routes = [
  { path: '', redirectTo: '/panel', pathMatch: 'full'},
  { path:'inicio',  component: InicioComponent, children: [
    { path: '', component: LoginComponent},
  ]},
  { path:'dashboard', component: DashboardComponent, children: [
    { path: '', component: SelectorComponent},
    { path: 'detalle/:id', component: DetalleIndicadorComponent},
  ]},
  { path: 'panel', component: PanelComponent, children: [
    { path: '', component: InicioComponent},
    { path: 'institucion', component: InstitucionComponent},
    { path: 'modelo', component: ModeloComponent},
    { path: 'criterio', component: CriterioComponent},
    { path: 'subcriterio', component: SubCriterioComponent},
    { path: 'indicador', component: IndicadoresComponent},
  ]},
  { path: '**', redirectTo: '/panel'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
