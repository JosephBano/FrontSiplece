import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleIndicadorComponent } from './components/panel/evidencias/selector/detalle-indicador/detalle-indicador.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { SelectorComponent } from './components/panel/evidencias/selector/selector.component';
import { PanelComponent } from './components/panel/panel.component';
import { ModeloComponent } from './components/panel/tablas/modelo/modelo.component';
import { CriterioComponent } from './components/panel/tablas/criterio/criterio.component';
import { SubCriterioComponent } from './components/panel/tablas/sub-criterio/sub-criterio.component';
import { IndicadoresComponent } from './components/panel/tablas/indicadores/indicadores.component';
import { InicioPanelComponent } from './components/panel/inicio-panel/inicio-panel.component';
import { EvidenciasComponent } from './components/panel/evidencias/evidencias.component';
import { ElementoFundamentalComponent } from './components/panel/tablas/elemento-fundamental/elemento-fundamental.component';
import { EvidenciaComponent } from './components/panel/tablas/evidencia/evidencia.component';
import { TablasComponent } from './components/panel/tablas/tablas.component';
import { MenuTablasComponent } from './components/panel/tablas/menu-tablas/menu-tablas.component';
import { ParametrosComponent } from './components/panel/parametros/parametros.component';
import { VistaParametrosComponent } from './components/panel/parametros/vista-parametros/vista-parametros.component';
import { ConfiguracionComponent } from './components/panel/configuracion/configuracion.component';
import { CheckManagerComponent } from './components/panel/check-manager/check-manager.component';
import { TablaIndicadoresComponent } from './components/panel/check-manager/tabla-indicadores/tabla-indicadores.component';

const routes: Routes = [
  { path: '', redirectTo: '/panel', pathMatch: 'full'},
  { path:'inicio',  component: InicioComponent, children: [
    { path: '', component: LoginComponent},
  ]},
  { path: 'panel', component: PanelComponent, children: [
    { path: '', component: InicioPanelComponent},
    { path: 'tablas', component: TablasComponent, children: [
      { path: '', component: MenuTablasComponent},
      { path: 'modelo', component: ModeloComponent},
      { path: 'criterio', component: CriterioComponent},
      { path: 'subcriterio', component: SubCriterioComponent},
      { path: 'indicador', component: IndicadoresComponent},
      { path: 'elementos', component: ElementoFundamentalComponent},
      { path: 'evidencia', component: EvidenciaComponent},
    ]},
    { path: 'configuracion', component: ConfiguracionComponent},
    { path: 'checkmanager', component: CheckManagerComponent, children: [
      { path: '', component: TablaIndicadoresComponent},
    ]},
    { path: 'parametros', component: ParametrosComponent, children: [
      {path: '', component: VistaParametrosComponent},
    ]},
    { path: 'evidencias', component: EvidenciasComponent, children: [
      { path: '', component: SelectorComponent},
      { path: 'detalle/:id', component: DetalleIndicadorComponent},
    ]},
  ]},
  { path: '**', redirectTo: '/panel'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
