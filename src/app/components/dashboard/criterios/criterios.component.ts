import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Criterio } from 'src/app/models/criterios.model';
import { Modelo } from 'src/app/models/modelo.model';
import { CriteriosService } from 'src/app/services/criterios.service';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent {
  @Input() selectedModelo!: string;
  @Output() selectedCriterioChange = new EventEmitter<string>();
  criterios!: Criterio[];
  selectedCriterio: string = '';
  modelos: Modelo[] = [];

  seleccion: string = '';
  
  constructor(private criterioService: CriteriosService) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['selectedModelo'] && changes['selectedModelo'].currentValue)
    {
      this.obtenerModelos(changes['selectedInstitucion'].currentValue);
    }
  }

  obtenerModelos( modelosId: string) {
    this.criterioService.getCriterio(modelosId).subscribe( criterio => {
      if(criterio){
        this.criterios = criterio;
      }else{
        this.modelos = [];
      }
    }, error =>{
      console.error('Error al obtener criterios: ', error);
    }
    );
  }

  seleccionarCriterio(event: Event) {
    const selecElement = event.target as HTMLSelectElement;
    this.selectedCriterio = selecElement.value;
    this.selectedCriterioChange.emit(this.selectedCriterio);
  }
}
