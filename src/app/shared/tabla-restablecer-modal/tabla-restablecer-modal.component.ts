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
    private elementoService: ElementoFundamentalService,
    private evidenciaService: EvidenciaService,
  ) { }
  
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
        break;
      case 'elemento':
          break;
      case 'evidencia':
        break;
      default:
    }

    this.cerrarRestablecerModal.nativeElement.click();
  }
}
