import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Institucion } from '../../../models/institucion.model';
import { InstitucionesService } from 'src/app/services/modeloServicios/instituciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent implements OnInit {

  Instituciones: Institucion[] = [];
  Data: Institucion[] = [];
  filter!: string;

  checkboxDeshabilitarValue: boolean = false;

  @ViewChild('cerrarAgregarModal') cerrarAgregarModal!: ElementRef;
  @ViewChild('cerrarEditarModal') cerrarEditarModal!: ElementRef;
  @ViewChild('cerrarEliminarModal') cerrarEliminarModal!: ElementRef;
  @ViewChild('cerrarRestablecerModal') cerrarRestablecerModal!: ElementRef;

  agregar!: FormGroup;
  editar!: FormGroup;
  eliminar!: FormGroup;

  constructor (
    private fb: FormBuilder,
    private toastr: ToastrService,
    private institucionService: InstitucionesService,
  ) { 
    this.agregar = this.fb.group({
      detalle: ['', Validators.required],
      siglas: ['', Validators.required]
    });
    this.editar = this.fb.group({
      id: '',
      detalle: ['', Validators.required],
      siglas: ['', Validators.required],
    });
    this.eliminar = this.fb.group({
      id: ['', Validators.required],
      detalle: ['', Validators.required],
      siglas: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadInstitutions();
  }

  //Otras funcionalidades
  loadInstitutions(): void {
    this.institucionService.getInstituciones().subscribe( data => {
      this.Instituciones = data;
      this.Data = data;
    })  
  }

  cargarDatosEditar(institucion: Institucion){
    this.editar.get('id')?.setValue(institucion.IdInstitucion);
    this.editar.get('detalle')?.setValue(institucion.Detalle);
    this.editar.get('siglas')?.setValue(institucion.Siglas);
  }

  cargarDatosEliminar(institucion: Institucion) {
    this.eliminar.get('id')?.setValue(institucion.IdInstitucion);
    this.eliminar.get('detalle')?.setValue(institucion.Detalle);
    this.eliminar.get('siglas')?.setValue(institucion.Siglas);
  }

  //Agregar Insitucion
  agregarInstitucion() {
    const institucion: Institucion = {
      Detalle: this.agregar.value.detalle,
      Siglas: this.agregar.value.siglas.toUpperCase(),
    }

    this.institucionService.postInstitucion(institucion).subscribe((response) => {
      this.loadInstitutions();
      this.toastr.success('La institucion ha sido agregada correctamente!')
      console.log(response);
    }, (error) => {
      this.toastr.error('Error!, no se ha podido realizar los cambios')
      console.log(error);
    })
    if (this.cerrarAgregarModal) {
      this.cerrarAgregarModal.nativeElement.click();
    }
  }

  //editar Institucion

  editarInstitucion(){
    const institucion: Institucion = {
      IdInstitucion: this.editar.value.id,
      Detalle: this.editar.value.detalle,
      Siglas: this.editar.value.siglas.toUpperCase(),
      Activo: '1'
    }

    this.institucionService.updateInstitucion(institucion).subscribe((response) => {
      this.loadInstitutions();
      this.toastr.success('La institucion se ha editado correctamente!')
      console.log(response);
    }, (error) => {
      this.toastr.error('Error!, no se ha podido realizar los cambios')
      console.log(error);
    })

    if (this.cerrarEditarModal || this.cerrarRestablecerModal) {
      this.cerrarEditarModal.nativeElement.click();
      this.cerrarRestablecerModal.nativeElement.click();
    }
  }

  //Eliminar institucion
  eliminarInstitucion(){
    const id = this.eliminar.value.id;

    this.institucionService.deleteInstitucion(id).subscribe(
      data => {
        this.loadInstitutions();
        this.toastr.success('La institucion se ha deshabilitado correctamente!')
        console.log(data);
         
      }, 
      error => {
        console.log(error);
        this.toastr.error('Error!, no se ha podido realizar los cambios')
        
      }
    )
    if (this.cerrarEliminarModal) {
      this.cerrarEliminarModal.nativeElement.click();
    }
  }
}