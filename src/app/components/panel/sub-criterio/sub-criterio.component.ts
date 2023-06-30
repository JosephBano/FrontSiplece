import { Component, ElementRef, ViewChild } from '@angular/core';
import { SubCriterio } from '../../../models/subCriterios.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SubCriteriosService } from 'src/app/services/modeloServicios/sub-criterios.service';
import { CriteriosService } from 'src/app/services/modeloServicios/criterios.service';
import { Criterio } from 'src/app/models/criterios.model';

@Component({
  selector: 'app-sub-criterio',
  templateUrl: './sub-criterio.component.html',
  styleUrls: ['./sub-criterio.component.css']
})
export class SubCriterioComponent {

  SubCriterios: SubCriterio[] = [];
  Criterios: Criterio[] = [];
  Data: SubCriterio[] = [];
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
    private subcriterioService: SubCriteriosService,
    private criterioService: CriteriosService,
  )
  {
    this.agregar = this.fb.group({
      criterio: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      orden: ['', [Validators.required]],
    })
    this.editar = this.fb.group({
      id: ['', Validators.required],
      criterio: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      orden: ['', [Validators.required]],
    })
    this.eliminar = this.fb.group({
      id: ['', Validators.required],
      criterio: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      orden: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.loadSubCriterios();
    this.loadCriterios();
  }

  //Otras funcionalidades
  loadSubCriterios(): void {
    this.subcriterioService.getSubCriterio().subscribe( data => {
      this.SubCriterios = data;
      this.Data = data;
    })
  }

  loadCriterios(): void {
    this.criterioService.getCriterios().subscribe( data => {
      this.Criterios = data;
    })
  }

  getCriterioName(id: any){
    const detalle = this.Criterios.find(e => e.IdCriterio === id); 
    return detalle?.Detalle;
  }

  cargarDatosEditar(subcriterio: SubCriterio){
    this.editar.get('id')?.setValue(subcriterio.IdSubcriterio);
    this.editar.get('criterio')?.setValue(subcriterio.IdCriterio);
    this.editar.get('detalle')?.setValue(subcriterio.Detalle);
    this.editar.get('orden')?.setValue(subcriterio.Orden);
  }

  cargarDatosEliminar(subcriterio: SubCriterio){
    this.eliminar.get('id')?.setValue(subcriterio.IdSubcriterio);
    this.eliminar.get('criterio')?.setValue(this.getCriterioName(subcriterio.IdCriterio));
    this.eliminar.get('detalle')?.setValue(subcriterio.Detalle);
    this.eliminar.get('orden')?.setValue(subcriterio.Orden);
  }


  //agregar
  agregarSubCriterio(): void{
    const subcriterio: SubCriterio = {
      IdCriterio: this.agregar.value.criterio,
      Detalle: this.agregar.value.detalle,
      Orden: '1',
    }

    this.subcriterioService.postSubCriterio(subcriterio).subscribe(
      (data) => {
        this.toastr.success('El Sub-Criterio ha sido agregado correctamente!')
        this.loadSubCriterios();
        console.log(data);        
    }, (error) => {
      this.toastr.error('Error!, no se ha podido realizar los cambios')
      console.log(error);
    });

    if (this.cerrarAgregarModal) {
      this.cerrarAgregarModal.nativeElement.click();
    }
  }

  //Editar
  editarSubCriterio(): void {
    const subcriterio: SubCriterio = {
      IdSubcriterio: this.editar.value.id,
      IdCriterio: this.editar.value.criterio,
      Detalle: this.editar.value.detalle,
      Orden: this.editar.value.orden,
      Activo: '1'
    }

    this.subcriterioService.updateSubCriterio(subcriterio).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!')
        this.loadCriterios()      
        this.loadSubCriterios();
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

  //eliminar
  eliminarSubCriterio(): void{
    const id = this.eliminar.value.id;

    this.subcriterioService.deleteSubCriterio(id).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!')
        this.loadSubCriterios();
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
