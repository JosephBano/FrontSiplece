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
  selectedCriterio: any;
  modelos: Modelo[] = [];
  
  constructor(private criterioService: CriteriosService) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['selectedModelo'] && changes['selectedModelo'].currentValue)
    {
      this.obtenerCriterios(changes['selectedModelo'].currentValue);
    }
  }

  obtenerCriterios(modeloId: string) {
    this.criterioService.getCriterio(modeloId).subscribe( criterio => {
      if(criterio){
        this.criterios = criterio;
      }else{
        this.criterios = [];
      }
    }, error =>{
      console.error('Error al obtener criterios: ', error);
    });
  }

  seleccionarCriterio(event: Event) {
    const selecElement = event.target as HTMLSelectElement;
    this.selectedCriterioChange.emit(selecElement.value);
  }
}
