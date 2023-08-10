import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleIndicadorComponent } from './components/panel/evidencias/selector/detalle-indicador/detalle-indicador.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { SelectorComponent } from './components/panel/evidencias/selector/selector.component';
import { IndicadorTableComponent } from './components/panel/evidencias/selector/indicador-table/indicador-table.component';
import { ModalEvidenciasComponent } from './components/panel/evidencias/selector/detalle-indicador/modal-evidencias/modal-evidencias.component';
import { PanelComponent } from './components/panel/panel.component';
import { ModeloComponent } from './components/panel/tablas/modelo/modelo.component';
import { CriterioComponent } from './components/panel/tablas/criterio/criterio.component';
import { SubCriterioComponent } from './components/panel/tablas/sub-criterio/sub-criterio.component';
import { IndicadoresComponent } from './components/panel/tablas/indicadores/indicadores.component';
import { InstitucionPipe } from './pipes/SortAndFilter/institucion.pipe';
import { ModeloPipe } from './pipes/SortAndFilter/modelo.pipe';
import { DefaultPipe } from './pipes/default.pipe';
import { CriterioPipe } from './pipes/SortAndFilter/criterio.pipe';
import { SubCriterioPipe } from './pipes/SortAndFilter/sub-criterio.pipe';
import { IndicadorPipe } from './pipes/SortAndFilter/indicador.pipe';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { InicioPanelComponent } from './components/panel/inicio-panel/inicio-panel.component';
import { EvidenciasComponent } from './components/panel/evidencias/evidencias.component';
import { ElementoFundamentalComponent } from './components/panel/tablas/elemento-fundamental/elemento-fundamental.component';
import { ElementoPipe } from './pipes/SortAndFilter/elemento.pipe';
import { EvidenciaComponent } from './components/panel/tablas/evidencia/evidencia.component';
import { EvidenciaPipe } from './pipes/SortAndFilter/evidencia.pipe';
import { ParametrosComponent } from './components/panel/parametros/parametros.component';
import { TablasComponent } from './components/panel/tablas/tablas.component';
import { MenuTablasComponent } from './components/panel/tablas/menu-tablas/menu-tablas.component';
import { VistaParametrosComponent } from './components/panel/parametros/vista-parametros/vista-parametros.component';
import { PeriodoComponent } from './components/panel/parametros/periodo/periodo.component';
import { PonderacionComponent } from './components/panel/parametros/ponderacion/ponderacion.component';
import { TipoEvaluacionComponent } from './components/panel/parametros/tipo-evaluacion/tipo-evaluacion.component';
import { ConfiguracionComponent } from './components/panel/configuracion/configuracion.component';
import { ContenedorComponent } from './components/panel/tablas/menu-tablas/contenedor/contenedor.component';
import { EstadoEvidenciaComponent } from './components/panel/evidencias/selector/detalle-indicador/estado-evidencia/estado-evidencia.component';
@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    NavbarComponent,
    InicioComponent,
    DetalleIndicadorComponent,
    LoginComponent,
    IndicadorTableComponent,
    ModalEvidenciasComponent,
    PanelComponent,
    ModeloComponent,
    SidebarComponent,
    CriterioComponent,
    SubCriterioComponent,
    IndicadoresComponent,
    InstitucionPipe,
    ModeloPipe,
    DefaultPipe,
    CriterioPipe,
    SubCriterioPipe,
    IndicadorPipe,
    InicioPanelComponent,
    EvidenciasComponent,
    ElementoFundamentalComponent,
    ElementoPipe,
    EvidenciaComponent,
    EvidenciaPipe,
    ParametrosComponent,
    TablasComponent,
    MenuTablasComponent,
    VistaParametrosComponent,
    PeriodoComponent,
    PonderacionComponent,
    TipoEvaluacionComponent,
    ConfiguracionComponent,
    ContenedorComponent,
    EstadoEvidenciaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule, 
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    MatRadioModule, 
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
