import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Instituciones } from 'src/app/models/instituciones.model';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { UpdateService } from 'src/app/services/update-service.service';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {

  instituciones: Instituciones[] = [];
  institucionControl = new FormControl('');

  constructor(private institucionesService: InstitucionesService, private updateService: UpdateService) { }

  ngOnInit(): void {
    this.institucionesService.getInstituciones().subscribe((data) => {
      this.instituciones = data;
    });

    this.institucionControl.valueChanges.subscribe((value) => {
      this.updateService.selectInstitucion(value);
    });
  }
}
