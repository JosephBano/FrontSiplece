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
import { InstitucionesComponent } from './components/dashboard/selects/instituciones/instituciones.component';
import { ModeloComponent } from './components/dashboard/selects/modelo/modelo.component';
import { CriteriosComponent } from './components/dashboard/selects/criterios/criterios.component';
import { SubCriteriosComponent } from './components/dashboard/selects/sub-criterios/sub-criterios.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { IndicadoresComponent } from './components/dashboard/selects/indicadores/indicadores.component';
import { DetalleIndicadorComponent } from './components/dashboard/selects/detalle-indicador/detalle-indicador.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { SelectsComponent } from './components/dashboard/selects/selects.component';
import { TestComponent } from './components/dashboard/test/test.component';
import { SelectControlComponent } from './components/dashboard/test/select-control/select-control.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SelectsComponent,
    NavbarComponent,
    InstitucionesComponent,
    ModeloComponent,
    CriteriosComponent,
    SubCriteriosComponent,
    InicioComponent,
    IndicadoresComponent,
    DetalleIndicadorComponent,
    LoginComponent,
    TestComponent,
    SelectControlComponent,
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
