import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Criterio } from 'src/app/models/criterios.model';
import { Modelo } from 'src/app/models/modelo.model';
import { CriteriosService } from 'src/app/services/modeloServicios/criterios.service';
import { ModeloService } from 'src/app/services/modeloServicios/modelo.service';

@Component({
  selector: 'app-criterio',
  templateUrl: './criterio.component.html',
  styleUrls: ['./criterio.component.css']
})
export class CriterioComponent {

  Criterios: Criterio[] = [];
  Modelos: Modelo[] = [];
  Data: Criterio[] = [];
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
    private criterioService: CriteriosService,
  )
  {
    this.agregar = this.fb.group({
      modelo: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      orden: ['', [Validators.required]],
    })
    this.editar = this.fb.group({
      id: ['', Validators.required],
      modelo: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      orden: ['', [Validators.required]],
    })
    this.eliminar = this.fb.group({
      id: ['', Validators.required],
      modelo: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      orden: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.loadCriterios();
    this.loadModelos();
  }

  //Otras funcionalidades
  loadCriterios(): void {
    this.criterioService.getCriterios().subscribe( data => {
      this.Criterios = data;
      this.Data = data;
    })
  }

  loadModelos(): void {
    this.modeloService.getModelos().subscribe( data => {
      this.Modelos = data;
    })
  }

  getModeloName(id: any){
    const detalle = this.Modelos.find(e => e.IdModelo === id); 
    return detalle?.Detalle;
  }

  cargarDatosEditar(criterio: Criterio){
    this.editar.get('id')?.setValue(criterio.IdCriterio);
    this.editar.get('modelo')?.setValue(criterio.IdModelo);
    this.editar.get('detalle')?.setValue(criterio.Detalle);
    this.editar.get('orden')?.setValue(criterio.Orden);
  }

  cargarDatosEliminar(criterio: Criterio){
    this.eliminar.get('id')?.setValue(criterio.IdCriterio);
    this.eliminar.get('modelo')?.setValue(this.getModeloName(criterio.IdModelo));
    this.eliminar.get('detalle')?.setValue(criterio.Detalle);
    this.eliminar.get('orden')?.setValue(criterio.Orden);
  }


  //agregar Criterio
  agregarCriterio(): void{
    const criterio: Criterio = {
      IdModelo: this.agregar.value.modelo,
      Detalle: this.agregar.value.detalle,
      Orden: '1',
    }

    this.criterioService.postCriterios(criterio).subscribe(
      (data) => {
        this.toastr.success('El Criterio ha sido agregado correctamente!')
        this.loadCriterios();
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
  editarCriterio(): void {
    const criterio: Criterio = {
      IdCriterio: this.editar.value.id,
      IdModelo: this.editar.value.modelo,
      Detalle: this.editar.value.detalle,
      Orden: this.editar.value.orden,
      Activo: '1'
    }

    this.criterioService.updateCriterio(criterio).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!')
        this.loadModelos();
        this.loadCriterios()      
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
  eliminarCriterio(): void{
    const id = this.eliminar.value.id;

    this.criterioService.deleteCriterio(id).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!')
        this.loadCriterios();
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
