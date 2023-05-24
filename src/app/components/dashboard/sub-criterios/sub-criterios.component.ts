import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { SubCriterio } from '../../../models/subCriterios.model';
import { Criterio } from 'src/app/models/criterios.model';
import { SubCriteriosService } from 'src/app/services/sub-criterios.service';

@Component({
  selector: 'app-sub-criterios',
  templateUrl: './sub-criterios.component.html',
  styleUrls: ['./sub-criterios.component.css']
})
export class SubCriteriosComponent {
  @Input() selectedCriterio: any;
  @Output() selectedSubCriterioChange = new EventEmitter<string>();
  subCriterios!: SubCriterio[];
  selectedSubCriterio: string = '';
  critetios: Criterio[] = [];

  constructor(private sCriteriosService: SubCriteriosService) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['selectedCriterio'] && changes['selectedCriterio'].currentValue)
    {
      this.obtenerSubCriterios(changes['selectedCriterio'].currentValue);
    }
  }

  obtenerSubCriterios(criteriosId: string): void{
    this.sCriteriosService.getSubCriterio(criteriosId).subscribe(subcriterio => {
      if(subcriterio) {
        this.subCriterios = subcriterio;
      }else{
        this.subCriterios = [];
      }
    })
  }

  seleccionarSubCriterio(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSubCriterio = selectElement.value;
    this.selectedSubCriterioChange.emit(this.selectedSubCriterio);
  }

  handlerSubCriterioDisable(event: any): void {
    this.selectedSubCriterio = event.target.value;
    this.selectedSubCriterioChange.emit(this.selectedSubCriterio);
  }
}
