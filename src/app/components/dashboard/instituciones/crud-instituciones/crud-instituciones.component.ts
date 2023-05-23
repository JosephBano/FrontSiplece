import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Instituciones } from 'src/app/models/instituciones.model';
import { InstitucionesService } from 'src/app/services/instituciones.service';

@Component({
  selector: 'app-crud-instituciones',
  templateUrl: './crud-instituciones.component.html',
  styleUrls: ['./crud-instituciones.component.css']
})
export class CrudInstitucionesComponent implements OnInit {
  selectedInstitucion: string = '';
  instituciones: Instituciones[] = [];

  constructor(private institucionesService: InstitucionesService) { }

  ngOnInit(): void {
    this.obtenerInstituciones();
  }

  agregarInstitucion(nuevaInstitucion: string): void {
    if (nuevaInstitucion.trim() !== '') {
      const institucion: Instituciones = { descripcion: nuevaInstitucion };
      this.institucionesService.agregarInstitucion(institucion).subscribe(() => this.obtenerInstituciones());
    }
  }

  editarInstitucion(id: string, nuevoNombreInstitucion: string): void {
    if (nuevoNombreInstitucion.trim() !== '') {
      const institucion: Instituciones = { id: id, descripcion: nuevoNombreInstitucion };
      this.institucionesService.editarInstitucion(institucion).subscribe(() => this.obtenerInstituciones());
    }
  }

  eliminarInstitucion(id: string): void {
    this.institucionesService.eliminarInstitucion(id).subscribe(() => this.obtenerInstituciones());
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
}
