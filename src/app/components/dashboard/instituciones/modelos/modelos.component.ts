import { Component, OnInit, Input } from '@angular/core';
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
  modelos!: Modelo[];
  selectedModelo: string = '';
  instituciones: Instituciones[] = [];

  constructor (private modeloService: ModeloService) {  }

  ngOnInit(): void {
    this.obtenerModelos();
  }
  
  obtenerModelos(): void {
    if (this.selectedInstitucion) {
      this.modeloService.getModelos(this.selectedInstitucion).subscribe(
        modelos => {
          this.modelos = modelos;
        },
        error => {
          console.error('Error al obtener los modelos:', error);
        }
      );
    } else {
      this.modelos = [];
    }
  }

  agregarModelo(): void {
    if (this.selectedInstitucion) {
      const nuevoModelo: Modelo = {
        id: '1', 
        descripcion: 'Nuevo Modelo'
      };

      this.modeloService.agregarModelo(nuevoModelo).subscribe(
        response => {
          console.log('Modelo agregado exitosamente:', response);
          this.obtenerModelos();
        },
        error => {
          console.error('Error al agregar el modelo:', error);
        }
      );
    }
  }

  editarModelo(): void {
    const modeloEditado: Modelo = {
      id: '1', 
      descripcion: 'Modelo editado'
    };

    this.modeloService.editarModelo(modeloEditado).subscribe(
      response => {
        console.log('Modelo editado exitosamente:', response);
        this.obtenerModelos();
      },
      error => {
        console.error('Error al editar el modelo:', error);
      }
    );
  }

  eliminarModelo(): void {
    const modeloId: string = '1';

    this.modeloService.eliminarModelo(modeloId).subscribe(
      response => {
        console.log('Modelo eliminado exitosamente:', response);
        this.obtenerModelos();
      },
      error => {
        console.error('Error al eliminar el modelo:', error);
      }
    );
  }
  
}
