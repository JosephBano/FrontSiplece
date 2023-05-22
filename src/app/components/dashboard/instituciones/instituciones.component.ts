import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Instituciones } from 'src/app/models/instituciones.model';
import { InstitucionesService } from 'src/app/services/instituciones.service';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {

  instituciones: Instituciones[] = [];
  selectedInstitucion: Instituciones | null = null;
  
  constructor (private institucionService: InstitucionesService) { }

  ngOnInit(): void {
    this.institucionService.getOptions().subscribe((institucion: Instituciones[] ) => {
      this.instituciones = institucion;
    })
  }

  onSelectInstitucion(event: Event): void {
    const target = event.target as HTMLSelectElement; // Asegurándose que el target es un HTMLSelectElement
    const institucionId = target.value ?? null; // Utilizando el operador de coalescencia nula para manejar el caso en el que target.value es null
    this.selectedInstitucion = this.instituciones.find(institucion => institucion.id === institucionId) || null;
  }
  

}
