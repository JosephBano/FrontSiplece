import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EvidenciaPipe } from 'src/app/pipes/SortAndFilter/evidencia.pipe';
import { ElementoPipe } from 'src/app/pipes/SortAndFilter/elemento.pipe';
import { IndicadorPipe } from 'src/app/pipes/SortAndFilter/indicador.pipe';
import { SubCriterioPipe } from 'src/app/pipes/SortAndFilter/sub-criterio.pipe';
import { CriterioPipe } from 'src/app/pipes/SortAndFilter/criterio.pipe';
import { DefaultPipe } from 'src/app/pipes/default.pipe';
import { ModeloPipe } from 'src/app/pipes/SortAndFilter/modelo.pipe';
import { EvidenciaComponent } from './tablas/evidencia/evidencia.component';
import { ElementoFundamentalComponent } from './tablas/elemento-fundamental/elemento-fundamental.component';
import { IndicadoresComponent } from './tablas/indicadores/indicadores.component';
import { SubCriterioComponent } from './tablas/sub-criterio/sub-criterio.component';
import { CriterioComponent } from './tablas/criterio/criterio.component';
import { ContenedorComponent } from './tablas/menu-tablas/contenedor/contenedor.component';
import { MenuTablasComponent } from './tablas/menu-tablas/menu-tablas.component';
import { TablasComponent } from './tablas/tablas.component';
import { TablaIndicadoresComponent } from './check-manager/tabla-indicadores/tabla-indicadores.component';
import { CheckManagerComponent } from './check-manager/check-manager.component';
import { EvidenciasComponent } from './evidencias/evidencias.component';
import { PanelComponent } from './panel.component';
import { SelectorComponent } from './evidencias/selector/selector.component';
import { AsignarEncargadosComponent } from './asignar-encargados/asignar-encargados.component';
import { SelectAEComponent } from './asignar-encargados/select-ae/select-ae.component';
import { AdminComponent } from './admin/admin.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersPipe } from 'src/app/pipes/users.pipe';
import { ShearchUsersComponent } from './admin/shearch-users/shearch-users.component';


@NgModule({
  declarations: [
    SelectorComponent,
    PanelComponent,
    EvidenciasComponent,
    CheckManagerComponent,
    TablaIndicadoresComponent,
    //
    TablasComponent,
    MenuTablasComponent,
    ContenedorComponent,
    CriterioComponent,
    SubCriterioComponent,
    IndicadoresComponent,
    ElementoFundamentalComponent,
    EvidenciaComponent,
    //pipes
    ModeloPipe,
    DefaultPipe,
    CriterioPipe,
    SubCriterioPipe,
    IndicadorPipe,
    ElementoPipe,
    EvidenciaPipe,
    AsignarEncargadosComponent,
    SelectAEComponent,
    AdminComponent,
    ReportsComponent,
    ShearchUsersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
    PanelRoutingModule,
  ],
  providers: [
    CriterioComponent,
    SubCriterioComponent,
    IndicadoresComponent,
    ElementoFundamentalComponent,
    EvidenciaComponent,
  ],
  exports: []
})
export class PanelModule { }
