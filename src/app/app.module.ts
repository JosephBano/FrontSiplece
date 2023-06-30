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
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleIndicadorComponent } from './components/dashboard/selector/detalle-indicador/detalle-indicador.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { SelectorComponent } from './components/dashboard/selector/selector.component';
import { IndicadorTableComponent } from './components/dashboard/selector/indicador-table/indicador-table.component';
import { ModalEvidenciasComponent } from './components/dashboard/selector/detalle-indicador/modal-evidencias/modal-evidencias.component';
import { PanelComponent } from './components/panel/panel.component';
import { InstitucionComponent } from './components/panel/institucion/institucion.component';
import { ModeloComponent } from './components/panel/modelo/modelo.component';
import { CriterioComponent } from './components/panel/criterio/criterio.component';
import { SubCriterioComponent } from './components/panel/sub-criterio/sub-criterio.component';
import { IndicadoresComponent } from './components/panel/indicadores/indicadores.component';
import { InstitucionPipe } from './pipes/SortAndFilter/institucion.pipe';
import { ModeloPipe } from './pipes/SortAndFilter/modelo.pipe';
import { DefaultPipe } from './pipes/default.pipe';
import { CriterioPipe } from './pipes/SortAndFilter/criterio.pipe';
import { SubCriterioPipe } from './pipes/SortAndFilter/sub-criterio.pipe';
import { IndicadorPipe } from './pipes/SortAndFilter/indicador.pipe';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { InicioPanelComponent } from './components/panel/inicio-panel/inicio-panel.component';
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
    PanelComponent,
    InstitucionComponent,
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
