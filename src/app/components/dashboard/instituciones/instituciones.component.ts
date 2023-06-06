import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Instituciones } from 'src/app/models/instituciones.model';
import { DataService } from 'src/app/services/data.service';
import { InstitucionesService } from 'src/app/services/modeloServicios/instituciones.service';
import { UpdateService } from 'src/app/services/update-service.service';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {

  instituciones: Instituciones[] = [];
  institucionControl = new FormControl('');
  myComponentId = 'institucion';

  constructor(private institucionesService: InstitucionesService, private updateService: UpdateService, private ds: DataService) { }

  ngOnInit(): void {
    this.cargarInstituciones();
    this.actualizarInstitucionSeleccionada();
    this.agregarIdentificadorDS();
  }

  cargarInstituciones() {
    this.institucionesService.getInstituciones().subscribe((data) => {
      this.instituciones = data;
    });
  }

  actualizarInstitucionSeleccionada() {
    this.institucionControl.valueChanges.subscribe((value) => {
      this.updateService.selectInstitucion(value);
    });
  }

  agregarIdentificadorDS() {
    this.institucionControl.valueChanges.subscribe((value) => {
      this.ds.setObj(value?.toString() ?? '0', 1)
    });
  }
}
