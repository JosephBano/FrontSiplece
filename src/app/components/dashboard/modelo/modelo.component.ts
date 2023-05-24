import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/modelo.model';
import { Instituciones } from 'src/app/models/instituciones.model';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent {
  
  @Input() selectedInstitucion: any;
  @Output() selectedModeloChange = new EventEmitter<any>();
  modelos!: Modelo[];
  selectedModelo: string = '';
  instituciones: Instituciones[] = [];

  constructor(private modeloService: ModeloService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedInstitucion'] && changes['selectedInstitucion'].currentValue) {
      this.obtenerModelos(changes['selectedInstitucion'].currentValue);
    }
  }

  obtenerModelos(institucionId: string): void {
    this.modeloService.getModelo(institucionId).subscribe(
      modelo => {
        if (modelo) {
          this.modelos = modelo;
        } else {
          this.modelos = [];
        }
      },
      error => {
        console.error('Error al obtener los modelos:', error);
      }
    );
  }

  seleccionarModelo(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedModeloChange.emit(selectElement.value);
  }

  handleModeloSeleccionada(event: any): void {
    this.selectedModelo = event.target.value;
    this.selectedModeloChange.emit(this.selectedModelo);
  }
}
