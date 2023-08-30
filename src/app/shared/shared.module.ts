import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

//Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Componentes
import { SelectorIndicadoresComponent } from '../components/shared/selector-indicadores/selector-indicadores.component';
import { DetalleIndicadorComponent } from '../components/shared/detalle-indicador/detalle-indicador.component';
import { NavbarComponent } from '../components/shared/navbar/navbar.component';
import { SidebarComponent } from '../components/shared/sidebar/sidebar.component';
import { IndicadorTableComponent } from '../components/shared/selector-indicadores/indicador-table/indicador-table.component';
import { EstadoEvidenciaComponent } from '../components/shared/detalle-indicador/estado-evidencia/estado-evidencia.component';
import { ModalEvidenciasComponent } from '../components/shared/detalle-indicador/modal-evidencias/modal-evidencias.component';


@NgModule({
  declarations: [ 
    SelectorIndicadoresComponent,
    DetalleIndicadorComponent,
    NavbarComponent,
    SidebarComponent,
    IndicadorTableComponent,
    EstadoEvidenciaComponent,
    ModalEvidenciasComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  exports: [
    SelectorIndicadoresComponent,
    DetalleIndicadorComponent,
    NavbarComponent,
    SidebarComponent,
    IndicadorTableComponent,
    EstadoEvidenciaComponent,
    ModalEvidenciasComponent
  ]
})
export class SharedModule { }
