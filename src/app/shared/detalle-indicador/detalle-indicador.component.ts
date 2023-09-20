import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { Indicador } from '../../models/modelos-generales/indicador.model';
import { ElementoFundamentalService } from 'src/app/services/modeloServicios/elemento-fundamental.service';
import { ElementoFundamental } from 'src/app/models/modelos-generales/elemento-fundamental.model';
import { PermisoPeticion } from 'src/app/models/modelosSeguridad/perfil.model';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment.development';
import { PerfilService } from 'src/app/services/serviciosSeguridad/perfil.service';
import { forkJoin } from 'rxjs';
import { Sidebar } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-detalle-indicador',
  templateUrl: './detalle-indicador.component.html',
  styleUrls: ['./detalle-indicador.component.css']
})
export class DetalleIndicadorComponent implements OnInit {
  indicador!: Indicador;
  elementos: ElementoFundamental[] = []; 

  permisoParams?: PermisoPeticion;

  strTituloIndicador = '';
  strTipoIndicador = '';
  strEstandar = '';

  rol1 = '';
  rol2 = '';

  selectedEsenciales: number | null = null;
  selectedComplementarios: number | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private routeUrl: Router,
    private ds: Sidebar,
    private indicadorService: IndicadorService,
    private loginService: LoginService,
    private elementoService: ElementoFundamentalService,
    private perfilService: PerfilService,
    //private router: Router
  ) { }
   

  ngOnInit(): void {
    this.permisoParams = {
      codigoModelo: this.loginService.getTokenDecoded().modelo,
      codigoPerfil: this.loginService.getTokenDecoded().perfil,
      codigoEstado: 'A',
      codigoSistema: environment.NOMBRE_SISTEMA
    }
    this.route.params.subscribe(params => {
      const indicadorID = params['id'];
      this.getIndicadorById(indicadorID);
      this.loadElementosById(indicadorID);
    });
    this.InitRoles();
  }

  InitRoles() {
    if(this.routeUrl.url.includes('asignar-usuarios')) this.ds.actualizarActiveLiOrder1('encargado');
    if(this.routeUrl.url.includes('indicador-evidencia')) this.ds.actualizarActiveLiOrder1('evidencias');
    if(this.routeUrl.url.includes('revision-evidencia')) this.ds.actualizarActiveLiOrder1('checkmanager');
  }

  loadElementosById(id: string){    
    const permission$ = this.perfilService.getPermisos(this.permisoParams!).pipe(data => data)
    const element$ = this.elementoService.getElementoFundamental().pipe(data => data);

    forkJoin([permission$, element$]).subscribe(([permissionsData, elementsData]) => {
      this.elementos = elementsData.filter(e=>permissionsData.some(p=>p.codigoPermiso===e.CodigoElementoFundamental) && e.IdIndicador==id)
    })
  }

  getIndicadorById(id: string): void {
    /* SI TIENE ACCESO A INDICADOR DEBE CARGAR ESTO */
    const permission$ = this.perfilService.getPermisos(this.permisoParams!).pipe(data => data)
    const indicator$ = this.indicadorService.getIndicadorById(id).pipe(data => data);
    forkJoin([permission$,indicator$]).subscribe(([permissionsData,indicatorsData]) => {
      if (indicatorsData && indicatorsData.length > 0) {        
        const indicadores = indicatorsData.filter(i => permissionsData.some(p => p.codigoPermiso===i.CodigoIndicador))
        this.indicador= indicadores[0]; 
        if (this.indicador) {
          this.cargaDeDatos(); 
        }else{
          /* 404 not found */
          //this.router.navigate(['panel/evidencias/detalle', this.selectedIndicador])
        }
      }
    })
  }

  cargaDeDatos(): void {
    this.strTituloIndicador = this.indicador.Detalle || '';
    this.strTipoIndicador = this.indicador.IdTipoEvaluacion === "1" ? 'Cuantitativo' : 'Cualitativo';
  }
  
}