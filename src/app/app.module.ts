import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SelectorComponent } from './components/panel/evidencias/selector/selector.component';
import { PanelComponent } from './components/panel/panel.component';
import { InicioPanelComponent } from './components/panel/inicio-panel/inicio-panel.component';
import { EvidenciasComponent } from './components/panel/evidencias/evidencias.component';
import { CheckManagerComponent } from './components/panel/check-manager/check-manager.component';
import { TablaIndicadoresComponent } from './components/panel/check-manager/tabla-indicadores/tabla-indicadores.component';
import { AddTokenInterceptor } from './helpers/add-token.interceptor';
import { SharedModule } from './shared/shared.module';
import { TablasModule } from './components/panel/tablas/tablas.module';
import { InicioModule } from './components/inicio/inicio.module';

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    PanelComponent,
    InicioPanelComponent,
    EvidenciasComponent,
    CheckManagerComponent,
    TablaIndicadoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbModule, 
    HttpClientModule,
    TablasModule,
    SharedModule,
    InicioModule,
    ToastrModule.forRoot(),
    NgbAlertModule
  ],
  providers: [JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
