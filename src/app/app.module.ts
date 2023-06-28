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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleIndicadorComponent } from './components/dashboard/selector/detalle-indicador/detalle-indicador.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { SelectorComponent } from './components/dashboard/selector/selector.component';
import { IndicadorTableComponent } from './components/dashboard/selector/indicador-table/indicador-table.component';
import { ModalEvidenciasComponent } from './components/dashboard/selector/detalle-indicador/modal-evidencias/modal-evidencias.component';
import { TablasComponent } from './components/panel/tablas/tablas.component';
import { PanelComponent } from './components/panel/panel.component';
import { InstitucionComponent } from './components/panel/tablas/institucion/institucion.component';
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
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SelectorComponent,
    NavbarComponent,
    InicioComponent,
    DetalleIndicadorComponent,
    LoginComponent,
    IndicadorTableComponent,
    ModalEvidenciasComponent,
    TablasComponent,
    PanelComponent,
    InstitucionComponent,
    ModeloComponent,
    CriterioComponent,
    SubCriterioComponent,
    IndicadoresComponent,
    InstitucionPipe,
    ModeloPipe,
    DefaultPipe,
    CriterioPipe,
    SubCriterioPipe,
    IndicadorPipe,
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
