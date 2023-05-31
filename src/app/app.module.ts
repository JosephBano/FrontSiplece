import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
import { CrearElementoComponent } from './components/dashboard/crudbutton/crear-elemento/crear-elemento.component';
import { EditarElementoComponent } from './components/dashboard/crudbutton/editar-elemento/editar-elemento.component';
import { EliminarElementoComponent } from './components/dashboard/crudbutton/eliminar-elemento/eliminar-elemento.component';
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
    CrearElementoComponent,
    EditarElementoComponent,
    EliminarElementoComponent,
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
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
