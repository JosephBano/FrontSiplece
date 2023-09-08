import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ElementoFundamental } from 'src/app/models/modelos-generales/elemento-fundamental.model';
import { Evidencia } from 'src/app/models/modelos-generales/evidencia.model';
import { Periodo } from '../../../../models/modelos-generales/periodo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EvidenciaService } from 'src/app/services/modeloServicios/evidencia.service';
import { ElementoFundamentalService } from 'src/app/services/modeloServicios/elemento-fundamental.service';
import { PeriodoService } from 'src/app/services/modeloServicios/periodo.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { FilterDataService } from 'src/app/services/filter-data.service';

@Component({
  selector: 'app-evidencia',
  templateUrl: './evidencia.component.html',
  styleUrls: ['./evidencia.component.css']
})
export class EvidenciaComponent implements OnInit{
  Evidencias: Evidencia[] = [];
  Elementos: ElementoFundamental[] = [];
  Periodos: Periodo[] = [];
  
  filter!: string;
  checkboxDeshabilitarValue: boolean = false;
  restablecerEvidenciaAux!: Evidencia;

  moreSettings: boolean = false;
  valueFilter: string = '0';
  tablafilter!: FormGroup;

  @ViewChild('cerrarAgregarModal') cerrarAgregarModal!: ElementRef;
  @ViewChild('cerrarEditarModal') cerrarEditarModal!: ElementRef;
  @ViewChild('cerrarEliminarModal') cerrarEliminarModal!: ElementRef;
  @ViewChild('cerrarRestablecerModal') cerrarRestablecerModal!: ElementRef;

  agregar!: FormGroup;
  editar!: FormGroup;
  eliminar!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fd: FilterDataService,
    private router: Router,
    private toastr: ToastrService,
    private evidenciaService: EvidenciaService,
    private elementoService: ElementoFundamentalService,
    private periodoService: PeriodoService,
    private dataService: DataService,
  ) {
    this.agregar = this.fb.group({
      elemento: ['', Validators.required],
      periodoAdd: ['', Validators.required],
      detalle: ['', Validators.required],
      orden: ['', Validators.required],
    })
    this.editar = this.fb.group({
      id: ['', Validators.required],
      elemento: ['', Validators.required],
      periodoEdit: ['', Validators.required],
      detalle: ['', Validators.required],
      orden: ['', Validators.required],
    })
    this.eliminar = this.fb.group({
      id: ['', Validators.required],
      elemento: ['', Validators.required],
      periodo: ['', Validators.required],
      detalle: ['', Validators.required],
      orden: ['', Validators.required],
    })

    this.tablafilter = this.fb.group({
      filter: [''],
    })
  }

  ngOnInit(): void {
    this.dataService.actualizarActiveLiOrder1('tablas');
    this.dataService.actualizarActiveLiOrder2('evidencia');
    this.InitFiltro();
    this.loadEvidencia();
    this.loadElementosFundamentales();
    this.loadPeriodos();
  }

  //Load Data
  InitFiltro(){
    this.fd.actualizarFiltroDefault('evidencia');
    this.fd.getFiltro('evidencia').subscribe(
      (data) => {
        if (data) {
          this.tablafilter.get('filter')?.setValue(data);
          this.valueFilter = data;
        }
      }
    )
  }

  moreSettingsHandler(){
    this.moreSettings = !this.moreSettings
  }

  OnChangeFilter() {
    this.valueFilter = this.tablafilter.value.filter;
  }

  loadEvidencia(){
    this.evidenciaService.getEvidencia().subscribe(
      (data) => {
        this.Evidencias = data;
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

  loadPeriodos(){
    this.periodoService.getPeriodo().subscribe(
      (data) => {
        this.Periodos = data;
      }
    )
  }

  // Get objects  
  getDetalleElemento(id: any){
    const obj = this.Elementos.find(e => e.IdElemento === id);
    return obj?.Detalle;
  }

  /*getDetallePeriodo(id: any){
    const obj = this.Periodos.find(e => e.IdPeriodo === id);
    return obj?.Detalle;
  }*/

  //otrasFunciones
  setDefaultAgregar(){
    this.agregar.get('periodo')?.setValue('');
    this.agregar.get('detalle')?.setValue('');
    this.agregar.get('periodoAdd')?.setValue('');
    this.agregar.get('orden')?.setValue('');
  }
  
  setPreEditar(evidencia: Evidencia){
    this.editar.get('id')?.setValue(evidencia.IdEvidencia);
    this.editar.get('codigoEvidencia')?.setValue(evidencia.CodigoEvidencia);
    this.editar.get('elemento')?.setValue(evidencia.IdElemento);
    this.editar.get('detalle')?.setValue(evidencia.Detalle);
    this.editar.get('orden')?.setValue(evidencia.Orden);
  }
  
  setPreEliminar(evidencia: Evidencia){
    this.eliminar.get('id')?.setValue(evidencia.IdEvidencia);
    // this.eliminar.get('codigoEvidencia')?.setValue(this.getDetallePeriodo(evidencia.CodigoEvidencia));
    this.eliminar.get('elemento')?.setValue(this.getDetalleElemento(evidencia.IdElemento));
    this.eliminar.get('detalle')?.setValue(evidencia.Detalle);
    this.eliminar.get('orden')?.setValue(evidencia.Orden);
  }

  setPreRestablecer(evidencia: Evidencia){
    this.restablecerEvidenciaAux = evidencia;
  }

  //agregar
  agregarEvidencia(){
    const evidencia: Evidencia = {
      IdElemento: this.agregar.value.elemento,
      CodigoEvidencia: this.agregar.value.codigoEvidencia,
      // IdPeriodo: this.agregar.value.periodoAdd,
      Detalle: this.agregar.value.detalle,
      Orden: this.agregar.value.orden,
      Activo: '1',
    }

    this.evidenciaService.postEvidencia(evidencia).subscribe(
      (data) => {
        this.toastr.success('La Evidencia ha sido agregado correctamente!');
        this.loadEvidencia();
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
  editarEvidencia(){
    const evidencia: Evidencia = {
      IdEvidencia: this.editar.value.id,
      CodigoEvidencia: this.editar.value.codigoEvidencia,
      IdElemento: this.editar.value.elemento,
      // IdPeriodo: this.editar.value.periodoEdit,
      Detalle: this.editar.value.detalle,
      Orden: this.editar.value.orden,
      Activo: '1',
    }
    
    this.evidenciaService.updateEvidencia(evidencia).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!');
        this.loadEvidencia();
        this.loadElementosFundamentales();
        this.loadPeriodos();
        console.log(data);
      },
      (error) => {
        this.toastr.error('Error!, no se ha podido realizar los cambios');
        console.log(error);
      }
    );

    if (this.cerrarEditarModal) {
      this.cerrarEditarModal.nativeElement.click();
    }
  }

  //eliminar
  eliminarEvidencia(){
    const id = this.eliminar.value.id;

    this.evidenciaService.deleteEvidencia(id).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!');
        this.loadEvidencia();
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
  restablecerEvidencia(){
    this.restablecerEvidenciaAux.Activo = '1';    
    this.evidenciaService.updateEvidencia(this.restablecerEvidenciaAux).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!');
        this.loadEvidencia();
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
