import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modelo } from 'src/app/models/modelo.model';
import { ModeloService } from 'src/app/services/modelo.service';

@Component({
  selector: 'app-crud-modelos',
  templateUrl: './crud-modelos.component.html',
  styleUrls: ['./crud-modelos.component.css']
})
export class CrudModelosComponent implements OnInit {
  @Input() selectedInstitucion!: string;
  @Output() selectedModeloChange = new EventEmitter<string>();
  modelos: Modelo[] = [];
  newModeloDescripcion: string = '';
  selectedModelo: string = '';

  constructor(private modeloService: ModeloService) {}

  ngOnInit(): void {
    this.obtenerModelos();
  }

  agregarModelos(nuevoModelo: string): void {
    if (nuevoModelo.trim() !== '') {
      const modelo: Modelo = { descripcion: nuevoModelo };
      this.modeloService.agregarModelo(modelo).subscribe(() => this.  obtenerModelos());
    }
  }

  editarModelos(id: string, nuevoNombreModelo: string): void {
    if (nuevoNombreModelo.trim() !== '') {
      const modelo: Modelo = { id: id, descripcion: nuevoNombreModelo };
      this.modeloService.editarModelo(modelo).subscribe(() => this. obtenerModelos());
    }
  }

  elminarModelos(id: string): void {
    this.modeloService.eliminarModelo(id).subscribe(() => this. obtenerModelos());
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

}
