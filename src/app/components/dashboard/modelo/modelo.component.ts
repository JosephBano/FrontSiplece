import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/modelo.model';
import { Instituciones } from 'src/app/models/instituciones.model';
import { InstitucionesModelosService } from '../../../services/relations/instituciones-modelos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements  OnDestroy {
  
  @Input() selectedInstitucion!: string;
  @Output() selectedModeloChange = new EventEmitter<string>();
  modelos!: Modelo[];
  selectedModelo: string = '';
  instituciones: Instituciones[] = [];

  seleccion: string = '';
  private seleccionSub: Subscription;

  constructor(private modeloService: ModeloService, private InstitucionesModelosService: InstitucionesModelosService) {
    this.seleccionSub = InstitucionesModelosService.seleccion$.subscribe( seleccion => {
      this.seleccion =seleccion;
    })
  }
  ngOnDestroy(): void {
    this.seleccionSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedInstitucion'] && changes['selectedInstitucion'].currentValue) 
    {
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
    this.selectedModelo = selectElement.value;
    this.selectedModeloChange.emit(this.selectedModelo);
  }
}
