import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CriteriosService } from '../../services/modeloServicios/criterios.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FilterDataService } from 'src/app/services/filter-data.service';
import { SubCriteriosService } from 'src/app/services/modeloServicios/sub-criterios.service';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { ElementoFundamentalService } from 'src/app/services/modeloServicios/elemento-fundamental.service';
import { EvidenciaService } from 'src/app/services/modeloServicios/evidencia.service';
import { CriterioComponent } from '../../components/panel/tablas/criterio/criterio.component';

@Component({
  selector: 'app-tabla-eliminar-modal',
  templateUrl: './tabla-eliminar-modal.component.html',
  styleUrls: ['./tabla-eliminar-modal.component.css']
})
export class TablaEliminarModalComponent{

  @Input() objetoEliminar!: any;
  @Input() idEliminar!: any;

  
  @ViewChild('cerrarEliminarModal') cerrarEliminarModal!: ElementRef;

  private readonly def_path = 'panel/tablas/';

  constructor ( 
    private toastr: ToastrService,
    private criterioService: CriteriosService,
    private criterioComponent: CriterioComponent, 
    private scriterioService: SubCriteriosService,
    private indicadorService: IndicadorService,
    private elementoService: ElementoFundamentalService,
    private evidenciaService: EvidenciaService,
  ) { }

  getData() {
    switch (this.objetoEliminar) {
      case 'criterio':
        this.criterioService.deleteCriterio(this.idEliminar.IdCriterio).subscribe(
          (data) => {
            this.toastr.success(`Se ha eliminado el Criterio ${this.idEliminar.Detalle} correctamente!`);
            this.criterioComponent.loadCriterios();
          },
          (error) => {
            this.toastr.error(`Ha ocurrido un error al eliminar el criterio ${this.objetoEliminar.Detalle}!`);
          }
        )
        break;
      case 'subcriterio':

        break;
      case 'indicador':
        break;
      case 'elemento':
          break;
      case 'evidencia':
        break;
      default:
    }

    this.cerrarEliminarModal.nativeElement.click();
  }
}
