import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CriterioComponent } from 'src/app/components/panel/tablas/criterio/criterio.component';
import { CriteriosService } from 'src/app/services/modeloServicios/criterios.service';
import { ElementoFundamentalService } from 'src/app/services/modeloServicios/elemento-fundamental.service';
import { EvidenciaService } from 'src/app/services/modeloServicios/evidencia.service';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { SubCriteriosService } from 'src/app/services/modeloServicios/sub-criterios.service';
import { Criterio } from '../../models/modelos-generales/criterio.model';
import { SubCriterioComponent } from 'src/app/components/panel/tablas/sub-criterio/sub-criterio.component';
import { SubCriterio } from 'src/app/models/modelos-generales/subCriterio.model';
import { IndicadoresComponent } from 'src/app/components/panel/tablas/indicadores/indicadores.component';
import { ElementoFundamentalComponent } from 'src/app/components/panel/tablas/elemento-fundamental/elemento-fundamental.component';
import { EvidenciaComponent } from 'src/app/components/panel/tablas/evidencia/evidencia.component';
import { Indicador } from 'src/app/models/modelos-generales/indicador.model';
import { ElementoFundamental } from 'src/app/models/modelos-generales/elemento-fundamental.model';
import { Evidencia } from 'src/app/models/modelos-generales/evidencia.model';

@Component({
  selector: 'app-tabla-restablecer-modal',
  templateUrl: './tabla-restablecer-modal.component.html',
  styleUrls: ['./tabla-restablecer-modal.component.css']
})
export class TablaRestablecerModalComponent {
  @Input() objetoRestablecer!: any;
  @Input() idRestablecer!: any;

  @ViewChild('cerrarRestablecerModal') cerrarRestablecerModal!: ElementRef;

  private readonly def_path = 'panel/tablas/';

  constructor ( 
    private toastr: ToastrService,
    private criterioService: CriteriosService,
    private criterioComponent: CriterioComponent, 
    private scriterioService: SubCriteriosService,
    private scriterioComponent: SubCriterioComponent,
    private indicadorService: IndicadorService,
    private indicadorComponent: IndicadoresComponent,
    private elementoService: ElementoFundamentalService,
    private elementoComponent: ElementoFundamentalComponent,
    private evidenciaService: EvidenciaService,
    private evidenciaComponent: EvidenciaComponent,
  ) { }
  
  getId() {
    switch (this.objetoRestablecer) {
      case 'criterio':
        return this.idRestablecer.IdCriterio + this.objetoRestablecer;
      case 'subcriterio':
        return this.idRestablecer.IdSubCriterio+ this.objetoRestablecer;
      case 'indicador':
        return this.idRestablecer.IdIndicador+ this.objetoRestablecer;
      case 'elemento':
        return this.idRestablecer.IdElemento+ this.objetoRestablecer;
      case 'evidencia':
        return this.idRestablecer.IdEvidencia+ this.objetoRestablecer;
      default:
        return 0;
    }
  }
  
  getData() {
    switch (this.objetoRestablecer) {
      case 'criterio':
        const criterio: Criterio = Object.assign({}, this.idRestablecer, {
          Activo: '1'
        });
        this.criterioService.updateCriterio(criterio).subscribe(
          (data) => {
            this.toastr.success(`Se ha restablecido el Criterio ${this.idRestablecer.Detalle} correctamente!`);
            this.criterioComponent.loadCriterios();
          },
          (error) => {
            this.toastr.error(`Ha ocurrido un error al restablecer el criterio ${this.objetoRestablecer.Detalle}!`);
          }
        )
        break;
      case 'subcriterio':
        const subcriterio: SubCriterio = Object.assign({}, this.idRestablecer, {
          Activo: '1'
        });
        this.scriterioService.updateSubCriterio(subcriterio).subscribe(
          (data) => {
            this.toastr.success(`Se ha restablecido el Sub-Criterio ${this.idRestablecer.Detalle} correctamente!`);
            this.scriterioComponent.loadSubCriterios();
          }, 
          (error) => {
            this.toastr.error(`Ha ocurrido un error al restablecer el criterio ${this.objetoRestablecer.Detalle}!`);
          }
        )
        break;
      case 'indicador':
        const indicador: Indicador = Object.assign({}, this.idRestablecer, {
          Activo: '1'
        });
        this.indicadorService.updateIndicador(indicador).subscribe(
          (data) => {
            this.toastr.success(`Se ha restablecido el Indicador ${this.idRestablecer.Detalle} correctamente!`);
            this.indicadorComponent.loadIndicadores();
          }, 
          (error) => {
            this.toastr.error(`Ha ocurrido un error al restablecer el Indicador ${this.objetoRestablecer.Detalle}!`);
          }
        )
        break;
      case 'elemento':
        const elemento: ElementoFundamental = Object.assign({}, this.idRestablecer, {
          Activo: '1'
        });
        this.elementoService.updateElementoFundamental(elemento).subscribe(
          (data) => {
            this.toastr.success(`Se ha restablecido el Elemento Fundamental ${this.idRestablecer.Detalle} correctamente!`);
            this.elementoComponent.loadElementosFundamentales();
          }, 
          (error) => {
            this.toastr.error(`Ha ocurrido un error al restablecer el Elemento Fundamental ${this.objetoRestablecer.Detalle}!`);
          }
        )
        break;
      case 'evidencia':
        const evidencia: Evidencia = Object.assign({}, this.idRestablecer, {
          Activo: '1'
        });
        this.evidenciaService.updateEvidencia(evidencia).subscribe(
          (data) => {
            this.toastr.success(`Se ha restablecido la Evidencia ${this.idRestablecer.Detalle} correctamente!`);
            this.evidenciaComponent.loadEvidencia();
          }, 
          (error) => {
            this.toastr.error(`Ha ocurrido un error al restablecer la Evidencia ${this.objetoRestablecer.Detalle}!`);
          }
        )
        break;
      default:
        this.toastr.error('Error en el componente generico');
    }

    this.cerrarRestablecerModal.nativeElement.click();
  }
}
