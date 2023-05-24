import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Instituciones } from 'src/app/models/instituciones.model';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { InstitucionesModelosService } from '../../../services/relations/instituciones-modelos.service';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {

  @Output() selectedInstitucionChange = new EventEmitter<string>();

  selectedInstitucion: any;
  instituciones: Instituciones[] = [];

  constructor(private institucionesService: InstitucionesService, private institucionesModelosService: InstitucionesModelosService) { }

  ngOnInit(): void {
    this.obtenerInstituciones();
  }

  obtenerInstituciones(): void {
    this.institucionesService.getInstituciones().subscribe(
      instituciones => {
        this.instituciones = instituciones;
      },
      error => {
        console.error('Error al obtener las instituciones:', error);
      }
    );
  }
  handleInstitucionSeleccionada(event: any): void {
    this.selectedInstitucion = event.target.value;
    this.selectedInstitucionChange.emit(this.selectedInstitucion);
  }

  onInstitucionChange(opcion: string) {
    this.institucionesModelosService.actualizarSeleccion(opcion);
  }
}
