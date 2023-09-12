import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CriteriosService } from '../../services/modeloServicios/criterios.service';
import { ToastrService } from 'ngx-toastr';
import { SubCriteriosService } from 'src/app/services/modeloServicios/sub-criterios.service';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { ElementoFundamentalService } from 'src/app/services/modeloServicios/elemento-fundamental.service';
import { EvidenciaService } from 'src/app/services/modeloServicios/evidencia.service';
import { CriterioComponent } from '../../components/panel/tablas/criterio/criterio.component';
import { SubCriterioComponent } from 'src/app/components/panel/tablas/sub-criterio/sub-criterio.component';
import { IndicadoresComponent } from 'src/app/components/panel/tablas/indicadores/indicadores.component';
import { ElementoFundamentalComponent } from 'src/app/components/panel/tablas/elemento-fundamental/elemento-fundamental.component';
import { EvidenciaComponent } from 'src/app/components/panel/tablas/evidencia/evidencia.component';

@Component({
  selector: 'app-tabla-eliminar-modal',
  templateUrl: './tabla-eliminar-modal.component.html',
  styleUrls: ['./tabla-eliminar-modal.component.css']
})
export class TablaEliminarModalComponent{

  @Input() handlerEliminar!: any;
  @Input() objetoEliminar!: any;

  
  @ViewChild('cerrarEliminarModal') cerrarEliminarModal!: ElementRef;

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

  getData() {    
    switch (this.handlerEliminar) {
      case 'criterio':
        this.criterioService.deleteCriterio(this.objetoEliminar.IdCriterio).subscribe(
          (data) => {
            this.toastr.success(`Se ha eliminado el Criterio ${this.objetoEliminar.Detalle} correctamente!`);
            this.criterioComponent.loadCriterios();
          },
          (error) => {
            this.toastr.error(`Ha ocurrido un error al eliminar el criterio ${this.objetoEliminar.Detalle}!`);
          }
        )
        break;
      case 'subcriterio':
        this.scriterioService.deleteSubCriterio(this.objetoEliminar.IdSubCriterio).subscribe(
          (data) => {
            this.toastr.success(`Se ha eliminado el Subcriterio ${this.objetoEliminar.Detalle}, correctamente!`);
            this.scriterioComponent.loadSubCriterios();
          },
          (error) => {
            this.toastr.error(`Ha ocurrido un error al eliminar el sub-criterio ${this.objetoEliminar.Detalle}!`)
          }
        )
        break;
      case 'indicador':
        this.indicadorService.deleteIndicador(this.objetoEliminar.IdIndicador).subscribe(
          (data) => {
            this.toastr.success(`Se ha eliminado el Indicador ${this.objetoEliminar.Detalle}, correctamente!`);
            this.indicadorComponent.loadIndicadores();
          },
          (error) => {
            this.toastr.error(`Ha ocurrido un error al eliminar el indicador ${this.objetoEliminar.Detalle}!`)
          }
        )
        break;
      case 'elemento':
        this.elementoService.deleteElementoFundamental(this.objetoEliminar.IdElemento).subscribe(
          (data) => {
            this.toastr.success(`Se ha eliminado el Elemento Fundamental ${this.objetoEliminar.Detalle}, correctamente!`);
            this.elementoComponent.loadElementosFundamentales();
          },
          (error) => {
            this.toastr.error(`Ha ocurrido un error al eliminar el Elemento Fundamental ${this.objetoEliminar.Detalle}!`)
          }
        )
        break;
      case 'evidencia':
        this.evidenciaService.deleteEvidencia(this.objetoEliminar.IdEvidencia).subscribe(
          (data) => {
            this.toastr.success(`Se ha eliminado la Evidencia ${this.objetoEliminar.Detalle}, correctamente!`);
            this.evidenciaComponent.loadEvidencia();
          },
          (error) => {
            this.toastr.error(`Ha ocurrido un error al eliminar la Evidencia ${this.objetoEliminar.Detalle}!`)
          }
        )
        break;
      default:
        this.toastr.error('Error en el componente generico')
    }

    this.cerrarEliminarModal.nativeElement.click();
  }
}
