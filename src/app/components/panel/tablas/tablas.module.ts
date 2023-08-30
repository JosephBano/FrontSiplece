import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablasRoutingModule } from './tablas-routing.module';

//Components
import { MenuTablasComponent } from './menu-tablas/menu-tablas.component';
import { ModeloComponent } from './modelo/modelo.component';
import { CriterioComponent } from './criterio/criterio.component';
import { SubCriterioComponent } from './sub-criterio/sub-criterio.component';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { ElementoFundamentalComponent } from './elemento-fundamental/elemento-fundamental.component';
import { EvidenciaComponent } from './evidencia/evidencia.component';
import { ContenedorComponent } from './menu-tablas/contenedor/contenedor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModeloPipe } from 'src/app/pipes/SortAndFilter/modelo.pipe';
import { DefaultPipe } from 'src/app/pipes/default.pipe';
import { CriterioPipe } from 'src/app/pipes/SortAndFilter/criterio.pipe';
import { SubCriterioPipe } from 'src/app/pipes/SortAndFilter/sub-criterio.pipe';
import { IndicadorPipe } from 'src/app/pipes/SortAndFilter/indicador.pipe';
import { ElementoPipe } from 'src/app/pipes/SortAndFilter/elemento.pipe';
import { EvidenciaPipe } from 'src/app/pipes/SortAndFilter/evidencia.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablasComponent } from './tablas.component';


@NgModule({
  declarations: [
    TablasComponent,
    MenuTablasComponent,
    ContenedorComponent,
    ModeloComponent,
    CriterioComponent,
    SubCriterioComponent,
    IndicadoresComponent,
    ElementoFundamentalComponent,
    EvidenciaComponent,
    //Pipes
    ModeloPipe,
    DefaultPipe,
    CriterioPipe,
    SubCriterioPipe,
    IndicadorPipe,
    ElementoPipe,
    EvidenciaPipe,
  ],
  imports: [
    CommonModule,
    TablasRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class TablasModule { }
