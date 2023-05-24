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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    InstitucionesComponent,
    CrudInstitucionesComponent,
    ModeloComponent,
    CrudModeloComponent
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
