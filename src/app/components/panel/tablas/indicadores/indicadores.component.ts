import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Indicador } from 'src/app/models/indicador.model';
import { SubCriterio } from '../../../../models/subCriterio.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { SubCriteriosService } from 'src/app/services/modeloServicios/sub-criterios.service';
import { TipoEvaluacion } from '../../../../models/tipo-evaluacion.model';
import { Valoracion } from '../../../../models/valoracion.model';
import { TipoEvaluacionService } from 'src/app/services/modeloServicios/tipo-evaluacion.service';
import { ValoracionService } from 'src/app/services/modeloServicios/valoracion.service';
import { DataService } from 'src/app/services/data.service';

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
  }

  ngOnInit(): void {
    this.dataService.actualizarActiveLiOrder2('indicador');
    this.loadIndicadores();
    this.loadSubCriterios();
    this.loadTipoEvaluaciones();
    this.loadValoraciones();
  }

  //Load Data
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
      IdSubCriterio: this.agregar.value.subcriterio,
      IdTipoEvaluacion: this.agregar.value.tipoagregar,
      Orden: this.agregar.value.orden,
      Detalle: this.agregar.value.detalle,
      Valoracion: '1',
      Activo: '1',
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
      IdSubCriterio: this.editar.value.subcriterio,
      IdTipoEvaluacion: this.editar.value.tipoeditar,
      Valoracion: this.editar.value.valoracion,
      Orden: this.editar.value.orden,
      Detalle: this.editar.value.detalle,
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
