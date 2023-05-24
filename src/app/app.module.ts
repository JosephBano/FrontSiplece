import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { InstitucionesComponent } from './components/dashboard/instituciones/instituciones.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CrudInstitucionesComponent } from './components/dashboard/instituciones/crud-instituciones/crud-instituciones.component';
import { ModeloComponent } from './components/dashboard/modelo/modelo.component';
import { CrudModeloComponent } from './components/dashboard/modelo/crud-modelo/crud-modelo.component';
import { CriteriosComponent } from './components/dashboard/criterios/criterios.component';
import { CrudCriteriosComponent } from './components/dashboard/criterios/crud-criterios/crud-criterios.component';
import { SubCriteriosComponent } from './components/dashboard/sub-criterios/sub-criterios.component';
import { CrudSubCriteriosComponent } from './components/dashboard/sub-criterios/crud-sub-criterios/crud-sub-criterios.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { IndicadoresComponent } from './components/dashboard/indicadores/indicadores.component';
import { CrudIndicadoresComponent } from './components/dashboard/indicadores/crud-indicadores/crud-indicadores.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    InstitucionesComponent,
    CrudInstitucionesComponent,
    ModeloComponent,
    CrudModeloComponent,
    CriteriosComponent,
    CrudCriteriosComponent,
    SubCriteriosComponent,
    CrudSubCriteriosComponent,
    InicioComponent,
    IndicadoresComponent,
    CrudIndicadoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule, 
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
