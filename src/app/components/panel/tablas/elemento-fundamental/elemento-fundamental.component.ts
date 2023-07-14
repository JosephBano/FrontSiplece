import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ElementoFundamental } from '../../../../models/elemento-fundamental.model';
import { Indicador } from 'src/app/models/indicador.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { ElementoFundamentalService } from '../../../../services/modeloServicios/elemento-fundamental.service';
import { Ponderacion } from '../../../../models/ponderacion.model';
import { PonderacionService } from 'src/app/services/modeloServicios/ponderacion.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-elemento-fundamental',
  templateUrl: './elemento-fundamental.component.html',
  styleUrls: ['./elemento-fundamental.component.css']
})
export class ElementoFundamentalComponent implements OnInit{
  Elementos: ElementoFundamental[] = [];
  Indicadores: Indicador[] = [];
  Ponderaciones: Ponderacion[] = [];
  filter!: string;

  checkboxDeshabilitarValue: boolean = false;
  restablecerElementoAux!: ElementoFundamental;

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
    private elementoService: ElementoFundamentalService,
    private indicadorService: IndicadorService,
    private dataService: DataService,
    private ponderacionService: PonderacionService,
  ) {
    this.agregar = this.fb.group({
      indicador: ['', Validators.required],
      ponderacionAdd: ['', Validators.required],
      detalle: ['', Validators.required],
      orden: ['', Validators.required],
    })
    this.editar = this.fb.group({
      id: ['', Validators.required],
      indicador: ['', Validators.required],
      ponderacionEdit: ['', Validators.required],
      detalle: ['', Validators.required],
      orden: ['', Validators.required],
    })
    this.eliminar = this.fb.group({
      id: ['', Validators.required],
      indicador: ['', Validators.required],
      ponderacion: ['', Validators.required],
      detalle: ['', Validators.required],
      orden: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.dataService.actualizarActiveLiOrder1('tablas');
    this.dataService.actualizarActiveLiOrder2('elemento');
    this.loadElementosFundamentales();
    this.loadIndicadores();
    this.loadPonderaciones();
  }

  //Load Data
  loadIndicadores(){
    this.indicadorService.getIndicador().subscribe(
      (data) => {
        this.Indicadores = data;
      }
    )
  }
  
  loadElementosFundamentales(){
    this.elementoService.getElementoFundamental().subscribe(
      (data) => {
        this.Elementos = data;
      }
    )
  }

  loadPonderaciones(){
    this.ponderacionService.getPonderacion().subscribe(
      (data) => {
        this.Ponderaciones = data;
      }
    )
  }

  // Get objects  
  getDetalleIndicador(id: any){
    const obj = this.Indicadores.find(e => e.IdIndicador === id);
    return obj?.Detalle;
  }

  getDetallePonderacion(id: any){
    const obj = this.Ponderaciones.find(e => e.IdPonderacion === id);
    return obj?.Detalle;
  }

  //otrasFunciones
  setDefaultAgregar(){
    this.agregar.get('indicador')?.setValue('');
    this.agregar.get('detalle')?.setValue('');
    this.agregar.get('ponderacionAdd')?.setValue('');
    this.agregar.get('orden')?.setValue('');
  }
  
  setPreEditar(elemento: ElementoFundamental){
    this.editar.get('id')?.setValue(elemento.IdElemento);
    this.editar.get('indicador')?.setValue(elemento.IdIndicador);
    this.editar.get('ponderacionEdit')?.setValue(elemento.IdPonderacion);
    this.editar.get('detalle')?.setValue(elemento.Detalle);
    this.editar.get('orden')?.setValue(elemento.Orden);
  }
  
  setPreEliminar(elemento: ElementoFundamental){
    this.eliminar.get('id')?.setValue(elemento.IdElemento);
    this.eliminar.get('indicador')?.setValue(this.getDetalleIndicador(elemento.IdIndicador));
    this.eliminar.get('ponderacion')?.setValue(this.getDetallePonderacion(elemento.IdPonderacion));
    this.eliminar.get('detalle')?.setValue(elemento.Detalle);
    this.eliminar.get('orden')?.setValue(elemento.Orden);
  }

  setPreRestablecer(elemento: ElementoFundamental){
    this.restablecerElementoAux = elemento;
  }

  //agregar
  agregarElemento(){
    const elemento: ElementoFundamental = {
      IdIndicador: this.agregar.value.indicador,
      IdPonderacion: this.agregar.value.ponderacionAdd,
      Orden: this.agregar.value.orden,
      Detalle: this.agregar.value.detalle,
      Activo: '1',
    }

    this.elementoService.postElementoFundamental(elemento).subscribe(
      (data) => {
        this.toastr.success('El Elemento Fundamental ha sido agregado correctamente!');
        this.loadElementosFundamentales();
        this.setDefaultAgregar();
        console.log(data);
      },
      (error) => {
        this.toastr.error('Error!, no se ha podido realizar los cambios');
        console.log(error);
      }
    )

    if(this.cerrarAgregarModal) {
      this.cerrarAgregarModal.nativeElement.click();
    }
  }
  //editar
  editarElemento(){
    const elemento: ElementoFundamental = {
      IdElemento: this.editar.value.id,
      IdIndicador: this.editar.value.indicador,
      IdPonderacion: this.editar.value.ponderacionEdit,
      Orden: this.editar.value.orden,
      Detalle: this.editar.value.detalle,
      Activo: '1',
    }
    
    this.elementoService.updateElementoFundamental(elemento).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!');
        this.loadElementosFundamentales();
        this.loadPonderaciones();
        this.loadIndicadores();
        console.log(data);
      },
      (error) => {
        this.toastr.error('Error!, no se ha podido realizar los cambios');
        console.log(error);
      }
    );

    if (this.cerrarEditarModal || this.cerrarRestablecerModal) {
      this.cerrarEditarModal.nativeElement.click();
      this.cerrarRestablecerModal.nativeElement.click();
    }
  }

  //eliminar
  eliminarElemento(){
    const id = this.eliminar.value.id;

    this.elementoService.deleteElementoFundamental(id).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!');
        this.loadElementosFundamentales();
        console.log(data);
      },
      (error) => {
        this.toastr.error('Error!, no se ha podido realizar los cambios')
        console.log(error);
      }
    );

    if (this.cerrarEliminarModal){
      this.cerrarEliminarModal.nativeElement.click();
    }
  }

  //restablecer
  restablecerElemento(){
    this.restablecerElementoAux.Activo = '1';
    this.elementoService.updateElementoFundamental(this.restablecerElementoAux).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!');
        this.loadElementosFundamentales();
        this.loadPonderaciones();
        this.loadIndicadores();
        console.log(data);
      },
      (error) => {
        this.toastr.error('Error!, no se ha podido realizar los cambios');
        console.log(error);
      }
    )
    if(this.cerrarRestablecerModal) {
      this.cerrarRestablecerModal.nativeElement.click();
    }
  }
}
