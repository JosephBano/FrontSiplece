import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ElementoFundamental } from '../../../../models/modelos-generales/elemento-fundamental.model';
import { Indicador } from 'src/app/models/modelos-generales/indicador.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { ElementoFundamentalService } from '../../../../services/modeloServicios/elemento-fundamental.service';
import { Ponderacion } from '../../../../models/modelos-generales/ponderacion.model';
import { PonderacionService } from 'src/app/services/modeloServicios/ponderacion.service';
import { DataService } from 'src/app/services/data.service';
import { FilterDataService } from 'src/app/services/filter-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elemento-fundamental',
  templateUrl: './elemento-fundamental.component.html',
  styleUrls: ['./elemento-fundamental.component.css', '../../panel.component.css']
})
export class ElementoFundamentalComponent implements OnInit{
Elementos: ElementoFundamental[] = [];
  Indicadores: Indicador[] = [];
  Ponderaciones: Ponderacion[] = [];
  
  filter!: string;
  checkboxDeshabilitarValue: boolean = false;
  restablecerElementoAux!: ElementoFundamental;

  moreSettings: boolean = false;
  valueFilter: string = '0';
  tablafilter!: FormGroup;

  @ViewChild('cerrarAgregarModal') cerrarAgregarModal!: ElementRef;
  @ViewChild('cerrarEditarModal') cerrarEditarModal!: ElementRef;

  agregar!: FormGroup;
  editar!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fd: FilterDataService,
    private router: Router,
    private toastr: ToastrService,
    private dataService: DataService,
    private elementoService: ElementoFundamentalService,
    private indicadorService: IndicadorService,
    private ponderacionService: PonderacionService,
  ) {
    this.agregar = this.fb.group({
      indicador: ['0', Validators.required],
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

    this.tablafilter = this.fb.group({
      filter: [''],
    })
  }

  ngOnInit(): void {
    this.dataService.actualizarActiveLiOrder1('tablas');
    this.dataService.actualizarActiveLiOrder2('elemento');
    this.InitFiltro();
    this.loadElementosFundamentales();
    this.loadIndicadores();
    this.loadPonderaciones();
  }

  //Load Data
  InitFiltro(){
    this.fd.actualizarFiltroDefault('elemento');
    this.fd.getFiltro('elemento').subscribe(
      (data) => {
        if (data) {
          this.tablafilter.get('filter')?.setValue(data);
          this.valueFilter = data;
        }
      }
    )
  }

  setIndicador() {
    this.agregar.get('indicador')?.setValue(this.valueFilter);
    if(this.valueFilter != '0') this.agregar.get('indicador')?.disable();
    else this.agregar.get('indicador')?.enable();
  }

  navegarFiltro(id: string | undefined) {
    const value = id ?? '';
    this.fd.actualizarFiltro('evidencia', value);
    this.router.navigate(['/panel/tablas/evidencia'])
  }

  OnChangeFilter() {
    this.valueFilter = this.tablafilter.value.filter;
    this.agregar.value.indicador = this.valueFilter;
  }
  
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
    this.editar.get('indicador')?.disable();
    this.editar.get('ponderacionEdit')?.setValue(elemento.IdPonderacion);
    this.editar.get('detalle')?.setValue(elemento.Detalle);
    this.editar.get('orden')?.setValue(elemento.Orden);
  }

  //agregar
  agregarElemento(){
    const elemento: ElementoFundamental = {
      IdIndicador: this.agregar.value.indicador,
      CodigoElementoFundamental: this.agregar.value.CodigoElementoFundamental,
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
    this.editar.get('indicador')?.enable();
    const elemento: ElementoFundamental = {
      IdElemento: this.editar.value.id,
      CodigoElementoFundamental: this.editar.value.codigoElementoFundamental,
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
}
