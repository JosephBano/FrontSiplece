import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/modelo.model';
import { Instituciones } from 'src/app/models/instituciones.model';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {
  
  @Input() selectedInstitucion!: string;
  @Output() selectedModeloChange = new EventEmitter<string>();
  modelos!: Modelo[];
  selectedModelo: string = '';
  instituciones: Instituciones[] = [];

  constructor(private modeloService: ModeloService) {}

  ngOnInit(): void {
    this.obtenerModelos();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedInstitucion']) {
      this.obtenerModelos();
    }
  }
  
  obtenerModelos(): void {
    if (this.selectedInstitucion) {
      this.modeloService.getModelo(this.selectedInstitucion).subscribe(
        modelo => {
          if (modelo) {
            this.modelos.push(modelo);
          }
        },
        error => {
          console.error('Error al obtener los modelos:', error);
        }
      );
    } else {
      this.modelos = [];
    }
  }

  seleccionarModelo(): void {
    this.selectedModeloChange.emit(this.selectedModelo);
  }
}
