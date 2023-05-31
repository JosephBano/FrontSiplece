import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { InstitucionesComponent } from './components/dashboard/instituciones/instituciones.component';
import { ModeloComponent } from './components/dashboard/modelo/modelo.component';
import { CriteriosComponent } from './components/dashboard/criterios/criterios.component';
import { SubCriteriosComponent } from './components/dashboard/sub-criterios/sub-criterios.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { IndicadoresComponent } from './components/dashboard/indicadores/indicadores.component';
import { CRUDButtonComponent } from './components/dashboard/crudbutton/crudbutton.component';
import { CRUDContenidosComponent } from './components/dashboard/crudbutton/crudcontenidos/crudcontenidos.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    InstitucionesComponent,
    ModeloComponent,
    CriteriosComponent,
    SubCriteriosComponent,
    InicioComponent,
    IndicadoresComponent,
    CRUDButtonComponent,
    CRUDContenidosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule, 
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
