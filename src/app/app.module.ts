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
import { AgregarInstitucionComponent } from './components/dashboard/instituciones/agregar-institucion/agregar-institucion.component';
import { EditarInstitucionComponent } from './components/dashboard/instituciones/editar-institucion/editar-institucion.component';
import { EliminarInstitucionComponent } from './components/dashboard/instituciones/eliminar-institucion/eliminar-institucion.component';
import { AgregarModeloComponent } from './components/dashboard/modelo/agregar-modelo/agregar-modelo.component';
import { EditarModeloComponent } from './components/dashboard/modelo/editar-modelo/editar-modelo.component';
import { EliminarModeloComponent } from './components/dashboard/modelo/eliminar-modelo/eliminar-modelo.component';
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
    AgregarInstitucionComponent,
    EditarInstitucionComponent,
    EliminarInstitucionComponent,
    AgregarModeloComponent,
    EditarModeloComponent,
    EliminarModeloComponent,
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
