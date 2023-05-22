import { Component, OnInit } from '@angular/core';
import { Instituciones } from 'src/app/models/instituciones.model';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { SelectedInstitucionService } from '../../../services/selected-institucion.service';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {

  instituciones: Instituciones[] = [];
  selectedInstitucion: Instituciones | null = null;
  
  constructor (private institucionService: InstitucionesService, private selectedInstitucionService: SelectedInstitucionService) { }

  ngOnInit(): void {
    this.institucionService.getInstituciones().subscribe((institucion: Instituciones[] ) => {
      console.log('Datos de instituciones: ', JSON.stringify(institucion)); 
      this.instituciones = institucion;
    })
}

onSelectInstitucion(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const institucionId = target.value ?? null;
  const selectedInstitucion = this.instituciones.find(institucion => institucion.id === institucionId) || null;
  this.selectedInstitucionService.setInstitucion(selectedInstitucion);
}
  

}
