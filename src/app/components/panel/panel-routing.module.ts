import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPanelComponent } from './inicio-panel/inicio-panel.component';
import { TablasComponent } from './tablas/tablas.component';
import { MenuTablasComponent } from './tablas/menu-tablas/menu-tablas.component';
import { ModeloComponent } from './tablas/modelo/modelo.component';
import { CriterioComponent } from './tablas/criterio/criterio.component';
import { SubCriterioComponent } from './tablas/sub-criterio/sub-criterio.component';
import { IndicadoresComponent } from './tablas/indicadores/indicadores.component';
import { ElementoFundamentalComponent } from './tablas/elemento-fundamental/elemento-fundamental.component';
import { EvidenciaComponent } from './tablas/evidencia/evidencia.component';
import { CheckManagerComponent } from './check-manager/check-manager.component';
import { TablaIndicadoresComponent } from './check-manager/tabla-indicadores/tabla-indicadores.component';
import { EvidenciasComponent } from './evidencias/evidencias.component';
import { SelectorComponent } from './evidencias/selector/selector.component';
import { DetalleIndicadorComponent } from 'src/app/shared/detalle-indicador/detalle-indicador.component';
import { authGuard } from 'src/app/helpers/auth.guard';

const routes: Routes = [
  { path: '', component: InicioPanelComponent},
    { path: 'tablas', component: TablasComponent, canActivate: [authGuard],children: [
      { path: '', component: MenuTablasComponent},
      { path: 'modelo', component: ModeloComponent},
      { path: 'criterio', component: CriterioComponent},
      { path: 'subcriterio', component: SubCriterioComponent},
      { path: 'indicador', component: IndicadoresComponent},
      { path: 'elementos', component: ElementoFundamentalComponent},
      { path: 'evidencia', component: EvidenciaComponent},
    ]},
    { path: 'checkmanager', component: CheckManagerComponent, children: [
      { path: '', component: TablaIndicadoresComponent},
    ]},
    { path: 'evidencias', component: EvidenciasComponent, children: [
      { path: '', component: SelectorComponent},
      { path: 'detalle/:id', component: DetalleIndicadorComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
