import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Instituciones } from 'src/app/models/instituciones.model';
import { DataService } from 'src/app/services/data.service';
import { InstitucionesService } from 'src/app/services/modeloServicios/instituciones.service';
import { UpdateService } from 'src/app/services/update-service.service';

@Component({
  selector: 'app-agregar-institucion',
  templateUrl: './agregar-institucion.component.html',
  styleUrls: ['./agregar-institucion.component.css']
})
export class AgregarInstitucionComponent {

  @ViewChild('CloseBtn') myButton!: ElementRef;
  elementFormAgregar!: FormGroup;  
  objData!: {institucion: string, modelo: string, criterio: string, subCriterio: string};

  constructor(private fb: FormBuilder, private institucionesService: InstitucionesService, private toastr: ToastrService, private ds: DataService) { }

  ngOnInit(): void {    
    this.initializeParameters();
    this.elementFormAgregar = this.fb.group({
      detalle: ['', [Validators.required, Validators.minLength(10)]],
      siglas: ['', Validators.required]
    });
  }

  //Funcionalidades

  initializeParameters() {
    this.ds.getObj().subscribe(data => {
      this.objData = data;
    })
  }

  onSubmitAgregar(): void {        
    this.initializeParameters();
    this.createInstitucion();
    //Cierra la aplicacion y setea los parametros por defecto si hay error o si ya se envio la solicitud post
    this.handlerbuttonClicked();
  }

  onSubmitEditar(): void {        
    this.initializeParameters();
    this.createInstitucion();
    this.handlerbuttonClicked();
  }

  handlerbuttonClicked() {
    this.myButton.nativeElement.click();
    this.elementFormAgregar.get('detalle')?.setValue('');
  }

  createInstitucion(): void {
    const institucion: Instituciones = {
      Detalle: this.elementFormAgregar.value.detalle,
      Siglas: this.elementFormAgregar.value.siglas.toUpperCase()
    }

    this.institucionesService.postInstitucion(institucion).subscribe(data => {
      this.toastr.success('Institucion creada con exito!');
      console.log('Institucion creada con exito!');
    }, error => {
      this.toastr.error('No se ha podido crear la institucion!');
      console.log(error);
    })
  }
}