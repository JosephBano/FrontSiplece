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
import { InicioModule } from './components/inicio/inicio.module';
import { TablasComponent } from './components/panel/tablas/tablas.component';
import { MenuTablasComponent } from './components/panel/tablas/menu-tablas/menu-tablas.component';
import { ContenedorComponent } from './components/panel/tablas/menu-tablas/contenedor/contenedor.component';
import { ModeloComponent } from './components/panel/tablas/modelo/modelo.component';
import { CriterioComponent } from './components/panel/tablas/criterio/criterio.component';
import { SubCriterioComponent } from './components/panel/tablas/sub-criterio/sub-criterio.component';
import { IndicadoresComponent } from './components/panel/tablas/indicadores/indicadores.component';
import { ElementoFundamentalComponent } from './components/panel/tablas/elemento-fundamental/elemento-fundamental.component';
import { EvidenciaComponent } from './components/panel/tablas/evidencia/evidencia.component';
import { ModeloPipe } from './pipes/SortAndFilter/modelo.pipe';
import { DefaultPipe } from './pipes/default.pipe';
import { CriterioPipe } from './pipes/SortAndFilter/criterio.pipe';
import { SubCriterioPipe } from './pipes/SortAndFilter/sub-criterio.pipe';
import { IndicadorPipe } from './pipes/SortAndFilter/indicador.pipe';
import { ElementoPipe } from './pipes/SortAndFilter/elemento.pipe';
import { EvidenciaPipe } from './pipes/SortAndFilter/evidencia.pipe';
import { PanelModule } from './components/panel/panel.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbModule, 
    HttpClientModule,
    PanelModule,
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
