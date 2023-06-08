import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Instituciones } from 'src/app/models/instituciones.model';
import { DataService } from 'src/app/services/data.service';
import { InstitucionesService } from 'src/app/services/modeloServicios/instituciones.service';

@Component({
  selector: 'app-editar-institucion',
  templateUrl: './editar-institucion.component.html',
  styleUrls: ['./editar-institucion.component.css']
})
export class EditarInstitucionComponent {

  @ViewChild('CloseBtn') myButton!: ElementRef;
  elementFormEditar!: FormGroup;  
  objData!: {institucion: string, modelo: string, criterio: string, subCriterio: string};

  fechaActual = new Date();

  setDefaultCrudElements() {
    this.ds.setIdentificator('');
  }

  constructor(private fb: FormBuilder, private institucionesService: InstitucionesService, private toastr: ToastrService, private ds: DataService) { 
    
  }

  ngOnInit(): void {
    
    this.initializeParameters();
    this.elementFormEditar = this.fb.group({
      detalle: ['', [Validators.required, Validators.minLength(10)]],
      siglas: ['', Validators.required],
      estado: ['']
    });
  }

  //Funcionalidades

  initializeParameters() {
    this.ds.getObj().subscribe(data => {
      this.objData = data;
    })
    console.log(this.objData);
    
  }

  onSubmit(): void {        
    this.initializeParameters();
    this.editarInstitucion();
    this.handlerbuttonClicked();
  }

  handlerbuttonClicked() {
    this.myButton.nativeElement.click();
    this.elementFormEditar.get('detalle')?.setValue('');
  }

  editarInstitucion(): void {
    const estadoCheckbox = this.elementFormEditar.value.estado ? '1' : '0';

    const institucion: Instituciones = {
      IdInstitucion: this.objData.institucion,
      Detalle: this.elementFormEditar.value.detalle,
      Siglas: this.elementFormEditar.value.siglas.toUpperCase(),
      Activo: estadoCheckbox
    }

    console.log(institucion);
    

    this.institucionesService.updateInstitucion(institucion).subscribe(data => {
      this.toastr.success('Institucion modificada con exito!');
    }, error => {
      this.toastr.error('No se ha podido modificar la institucion!');
      console.log(error);
    })
  }
}
