import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Indicador } from 'src/app/models/modelos-generales/indicador.model';
import { SubCriterio } from '../../../../models/modelos-generales/subCriterio.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { SubCriteriosService } from 'src/app/services/modeloServicios/sub-criterios.service';
import { TipoEvaluacion } from '../../../../models/modelos-generales/tipo-evaluacion.model';
import { Valoracion } from '../../../../models/modelos-generales/valoracion.model';
import { TipoEvaluacionService } from 'src/app/services/modeloServicios/tipo-evaluacion.service';
import { ValoracionService } from 'src/app/services/modeloServicios/valoracion.service';
import { DataService } from 'src/app/services/data.service';
import { FilterDataService } from 'src/app/services/filter-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit{
  Indicadores: Indicador[] = [];
  SubCriterios: SubCriterio[] = [];
  TipoEvaluaciones: TipoEvaluacion[] = [];
  Valoraciones: Valoracion[] = [];
  
  filter!: string;
  checkboxDeshabilitarValue: boolean = false;
  selectedTipos!: number;

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
    private indicadorService: IndicadorService,
    private subcriterioService: SubCriteriosService,
    private tipoService: TipoEvaluacionService,
    private valoracionService: ValoracionService,
    private dataService: DataService,
  ) {
    this.agregar = this.fb.group({
      subcriterio: ['', Validators.required],
      detalle: ['', Validators.required],
      orden: ['', Validators.required],
      tipoagregar: ['', Validators.required],
    })
    this.editar = this.fb.group({
      id: ['', Validators.required],
      subcriterio: ['', Validators.required],
      valoracion: ['', Validators.required],
      detalle: ['', Validators.required],
      orden: ['', Validators.required],
      tipoeditar: ['', Validators.required],
    })
    this.eliminar = this.fb.group({
      id: ['', Validators.required],
      subcriterio: ['', Validators.required],
      valoracion: ['', Validators.required],
      detalle: ['', Validators.required],
      orden: ['', Validators.required],
      tipodel: ['', Validators.required],
    })

    this.tablafilter = this.fb.group({
      filter: [''],
    })
  }

  ngOnInit(): void {
    this.dataService.actualizarActiveLiOrder1('tablas');
    this.dataService.actualizarActiveLiOrder2('indicador');
    this.InitFiltro();
    this.loadIndicadores();
    this.loadSubCriterios();
    this.loadTipoEvaluaciones();
    this.loadValoraciones();
  }

  //Load Data
  InitFiltro(){
    this.fd.actualizarFiltroDefault('indicador');
    this.fd.getFiltro('indicador').subscribe(
      (data) => {
        if (data) {
          this.tablafilter.get('filter')?.setValue(data);
          this.valueFilter = data;
        }
      }
    )
  }

  navegarFiltro(id: string | undefined) {
    const value = id ?? '';
    this.fd.actualizarFiltro('elemento', value);
    this.router.navigate(['/panel/tablas/elementos'])
  }

  moreSettingsHandler(){
    this.moreSettings = !this.moreSettings
  }

  OnChangeFilter() {
    this.valueFilter = this.tablafilter.value.filter;
  }
  
  loadIndicadores(){
    this.indicadorService.getIndicador().subscribe(
      (data) => {
        this.Indicadores = data;
      }
      )
    }
    
    loadSubCriterios(){
      this.subcriterioService.getSubCriterio().subscribe(
      (data) => {
        this.SubCriterios = data;
      }
      )
    }
    
    loadTipoEvaluaciones(){
      this.tipoService.getTipoEvaluacion().subscribe(
        (data) => {
          this.TipoEvaluaciones = data;
        }
        )
      }
      
  loadValoraciones() {
    this.valoracionService.getValoracion().subscribe(
      (data) => {
        this.Valoraciones = data;
      }
    )
  }

  // Get objects  
  getDetalleSubCriterio(id: any){
    const obj = this.SubCriterios.find(e => e.IdSubCriterio === id);
    return obj?.Detalle;
  }

  getDetalleTipoEvaluacion(id: any){
    const tipo = this.TipoEvaluaciones.find(e => e.IdTipoEvaluacion === id)    
    return tipo?.Detalle;
  }

  getDetalleValoracion(id: any){
    const valoracion = this.Valoraciones.find(e => e.IdValoracion === id)
    return valoracion?.Detalle;
  }

  //otrasFunciones
  setDefaultAgregar(){
    this.agregar.get('subcriterio')?.setValue('');
    this.agregar.get('detalle')?.setValue('');
    this.agregar.get('tipoagregar')?.setValue('');
    this.agregar.get('orden')?.setValue('');
  }
  
  setPreEditar(indicador: Indicador){
    this.editar.get('id')?.setValue(indicador.IdIndicador);
    this.editar.get('subcriterio')?.setValue(indicador.IdSubCriterio);
    this.editar.get('valoracion')?.setValue(indicador.Valoracion);
    this.editar.get('detalle')?.setValue(indicador.Detalle);
    this.editar.get('orden')?.setValue(indicador.Orden);
    this.editar.get('tipoeditar')?.setValue(indicador.IdTipoEvaluacion);
  }

  setPreEliminar(indicador: Indicador){
    this.eliminar.get('id')?.setValue(indicador.IdIndicador);
    this.eliminar.get('subcriterio')?.setValue(this.getDetalleSubCriterio(indicador.IdSubCriterio));
    this.eliminar.get('valoracion')?.setValue(this.getDetalleValoracion(indicador.Valoracion));
    this.eliminar.get('detalle')?.setValue(indicador.Detalle);
    this.eliminar.get('orden')?.setValue(indicador.Orden);
    this.eliminar.get('tipodel')?.setValue(this.getDetalleTipoEvaluacion(indicador.IdTipoEvaluacion));
  }

  //agregar
  agregarIndicador(){
    const indicador: Indicador = {
      CodigoIndicador: this.agregar.value.codigoIndicador,
      IdSubCriterio: this.agregar.value.subcriterio,
      IdTipoEvaluacion: this.agregar.value.tipoagregar,
      Orden: this.agregar.value.orden,
      Detalle: this.agregar.value.detalle,
      Estandar: this.editar.value.estandar,
      Valoracion: '1'
    }

    this.indicadorService.postIndicador(indicador).subscribe(
      (data) => {
        this.toastr.success('El Indicador ha sido agregado correctamente!');
        this.loadIndicadores();
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
  editarIndicador(){
    const indicador: Indicador = {
      IdIndicador: this.editar.value.id,
      CodigoIndicador: this.editar.value.codigoIndicador,
      IdSubCriterio: this.editar.value.subcriterio,
      IdTipoEvaluacion: this.editar.value.tipoeditar,
      Valoracion: this.editar.value.valoracion,
      Orden: this.editar.value.orden,
      Detalle: this.editar.value.detalle,
      Estandar: this.editar.value.estandar,
      Activo: '1',
    }
    
    this.indicadorService.updateIndicador(indicador).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!');
        this.loadIndicadores();
        this.loadSubCriterios();
        this.loadValoraciones();
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

  eliminarIndicador(){
    const id = this.eliminar.value.id;

    this.indicadorService.deleteIndicador(id).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!');
        this.loadIndicadores();
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
}
