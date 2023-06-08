import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Instituciones } from 'src/app/models/instituciones.model';
import { DataService } from 'src/app/services/data.service';
import { InstitucionesService } from 'src/app/services/modeloServicios/instituciones.service';

@Component({
  selector: 'app-eliminar-institucion',
  templateUrl: './eliminar-institucion.component.html',
  styleUrls: ['./eliminar-institucion.component.css']
})
export class EliminarInstitucionComponent {

  objData!: {institucion: string, modelo: string, criterio: string, subCriterio: string};

  constructor(private institucionesService: InstitucionesService, private toastr: ToastrService, private ds: DataService) { 
    
  }

  ngOnInit(): void {
    this.initializeParameters();
  }

  //Funcionalidades

  initializeParameters() {
    this.ds.getObj().subscribe(data => {
      this.objData = data;
    })
  }

  onSubmit(): void {        
    this.initializeParameters();
    this.eliminarInstitucion();
  }

  eliminarInstitucion(): void {    
    const id = this.objData.institucion;

    this.institucionesService.deleteInstitucion(id).subscribe(data => {
      this.toastr.success('Institucion eliminada con exito!');
    }, error => {
      this.toastr.error('No se ha podido eliminar la institucion!');
      console.log(error);
    })
  }
}
