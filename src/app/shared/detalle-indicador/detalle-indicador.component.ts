import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { Indicador } from '../../models/modelos-generales/indicador.model';
import { DataService } from 'src/app/services/data.service';
import { ElementoFundamentalService } from 'src/app/services/modeloServicios/elemento-fundamental.service';
import { ElementoFundamental } from 'src/app/models/modelos-generales/elemento-fundamental.model';
import { PermisoPeticion } from 'src/app/models/modelosSeguridad/perfil.model';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment.development';
import { PerfilService } from 'src/app/services/serviciosSeguridad/perfil.service';
import { forkJoin } from 'rxjs';

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

  selectedEsenciales: number | null = null;
  selectedComplementarios: number | null = null;

  rolview = '2';
  
  constructor(
    private route: ActivatedRoute,
    private indicadorService: IndicadorService,
    private loginService: LoginService,
    private elementoService: ElementoFundamentalService,
    private perfilService: PerfilService,
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
  }

  loadElementosById(id: string){    
    const permission$ = this.perfilService.getPermisos(this.permisoParams!).pipe(data => data)
    const element$ = this.elementoService.getElementoFundamental().pipe(data => data);

    forkJoin([permission$, element$]).subscribe(([permissionsData, elementsData]) => {
      this.elementos = elementsData.filter(e=>permissionsData.some(p=>((p.codigoPermiso===e.CodigoElementoFundamental)) && (e.IdIndicador===id)))
      console.log(permissionsData)
      console.log(elementsData)
      console.log(this.elementos)
    })
  }

  getIndicadorById(id: string): void {
    this.indicadorService.getIndicadorById(id).subscribe(
      data => {
        if (data && data.length > 0) {
          this.indicador = data[0]; 
          if (this.indicador) {
            this.cargaDeDatos();
          }
        }
      }
    );
  }

  cargaDeDatos(): void {
    this.strTituloIndicador = this.indicador.Detalle || '';
    this.strTipoIndicador = this.indicador.IdTipoEvaluacion === "1" ? 'Cuantitativo' : 'Cualitativo';
  }
  
}