import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablasComponent } from './tablas/tablas.component';
import { MenuTablasComponent } from './tablas/menu-tablas/menu-tablas.component';
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
import { AsignarEncargadosComponent } from './asignar-encargados/asignar-encargados.component';
import { SelectAEComponent } from './asignar-encargados/select-ae/select-ae.component';

const routes: Routes = [
  { path: '', component: EvidenciasComponent, children: [
    { path: '', component: SelectorComponent},
    { path: 'indicador-evidencia/:id', component: DetalleIndicadorComponent},
  ]},
  { path: 'tablas', component: TablasComponent, children: [
    { path: '', component: MenuTablasComponent},
    { path: 'criterio', component: CriterioComponent},
    { path: 'subcriterio', component: SubCriterioComponent},
    { path: 'indicador', component: IndicadoresComponent},
    { path: 'elementos', component: ElementoFundamentalComponent},
    { path: 'evidencia', component: EvidenciaComponent},
  ]},
  { path: 'supervisor', component: CheckManagerComponent, children: [
    { path: '', component: TablaIndicadoresComponent},
    { path: 'revision-evidencia/:id', component: DetalleIndicadorComponent},
  ]},
  { path: 'encargado', component: AsignarEncargadosComponent, children: [
    { path: '', component: SelectAEComponent},
    { path: 'asignar-usuarios/:id', component: DetalleIndicadorComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
