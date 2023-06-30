import { Component, ViewChildren, QueryList, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Modelo } from 'src/app/models/modelo.model';
import { ModeloService } from 'src/app/services/modeloServicios/modelo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesService } from 'src/app/services/modeloServicios/instituciones.service';
import { Instituciones } from 'src/app/models/instituciones.model';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements OnInit{

  Instituciones: Instituciones[] = [];
  Modelos: Modelo[] = [];
  Data: Modelo[] = [];

  filter!: string;
  checkboxDeshabilitarValue: boolean = false;
  

  @ViewChild('cerrarAgregarModal') cerrarAgregarModal!: ElementRef;
  @ViewChild('cerrarEditarModal') cerrarEditarModal!: ElementRef;
  @ViewChild('cerrarEliminarModal') cerrarEliminarModal!: ElementRef;
  @ViewChild('cerrarRestablecerModal') cerrarRestablecerModal!: ElementRef;

  agregar!: FormGroup;
  editar!: FormGroup;
  eliminar!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modeloService: ModeloService,
    private institucionService: InstitucionesService,
  )
  {
    this.agregar = this.fb.group({
      institucion: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      anio: [''],
    })
    this.editar = this.fb.group({
      id: ['', Validators.required],
      institucion: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      anio: ['', [Validators.required]],
    })
    this.eliminar = this.fb.group({
      id: ['', Validators.required],
      institucion: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      anio: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.loadModelos();
    this.loadInstituciones();
  }

  //Otras funcionalidades
  loadModelos(): void {
    this.modeloService.getModelos().subscribe( data => {
      this.Modelos = data;
      this.Data = data;
    })
  }

  loadInstituciones(): void {
    this.institucionService.getInstituciones().subscribe( data => {
      this.Instituciones = data;
    })
  }

  getInstitucionName(id: any){
    const detalle = this.Instituciones.find(e => e.IdInstitucion === id); 
    return detalle?.Detalle;
  }

  cargarDatosEditar(modelo: Modelo){
    this.editar.get('id')?.setValue(modelo.IdModelo);
    this.editar.get('institucion')?.setValue(modelo.IdInstitucion);
    this.editar.get('detalle')?.setValue(modelo.Detalle);
    this.editar.get('anio')?.setValue(modelo.Anio);
  }

  cargarDatosEliminar(modelo: Modelo){
    this.eliminar.get('id')?.setValue(modelo.IdModelo);
    this.eliminar.get('institucion')?.setValue(this.getInstitucionName(modelo.IdInstitucion));
    this.eliminar.get('detalle')?.setValue(modelo.Detalle);
    this.eliminar.get('anio')?.setValue(modelo.Anio);
  }


  //agregar modelo
  agregarModelo(): void{
    const modelo: Modelo = {
      IdInstitucion: this.agregar.value.institucion,
      Detalle: this.agregar.value.detalle,
      Anio: this.agregar.value.anio,
    }

    this.modeloService.postModelo(modelo).subscribe(
      (data) => {
        this.toastr.success('El modelo ha sido agregado correctamente!')
        this.loadModelos();
        console.log(data);        
    }, (error) => {
      this.toastr.error('Error!, no se ha podido realizar los cambios')
      console.log(error);
    });

    if (this.cerrarAgregarModal) {
      this.cerrarAgregarModal.nativeElement.click();
    }
  }

  //Editar Modelo
  editarModelo(): void {
    const modelo: Modelo = {
      IdModelo: this.editar.value.id,
      IdInstitucion: this.editar.value.institucion,
      Detalle: this.editar.value.detalle,
      Anio: this.editar.value.anio,
      Activo: '1'
    }

    this.modeloService.updateModelo(modelo).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!')
        this.loadInstituciones();
        this.loadModelos();        
        console.log(data);
    }, (error) => {
      this.toastr.error('Error!, no se ha podido realizar los cambios')
      console.log(error);
    });

    if (this.cerrarEditarModal || this.cerrarRestablecerModal) {
      this.cerrarEditarModal.nativeElement.click();
      this.cerrarRestablecerModal.nativeElement.click();
    }
  }

  //eliminar Modelo
  eliminarInstitucion(): void{
    const id = this.eliminar.value.id;

    this.modeloService.deleteModelo(id).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!')
        this.loadModelos();
        console.log(data);
      }
      , (error) => {
        this.toastr.error('Error!, no se ha podido realizar los cambios')
        console.log(error);
      });

    if (this.cerrarEliminarModal) {
      this.cerrarEliminarModal.nativeElement.click();
    }
  
  }
}
