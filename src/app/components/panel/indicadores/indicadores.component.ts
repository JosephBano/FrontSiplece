import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Indicador } from 'src/app/models/indicador.model';
import { SubCriterio } from '../../../models/subCriterio.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { SubCriteriosService } from 'src/app/services/modeloServicios/sub-criterios.service';
import { TipoEvaluacion } from '../../../models/tipo-evaluacion.model';
import { Valoracion } from '../../../models/valoracion.model';
import { TipoEvaluacionService } from 'src/app/services/modeloServicios/tipo-evaluacion.service';
import { ValoracionService } from 'src/app/services/modeloServicios/valoracion.service';

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
  ) {
    this.agregar = this.fb.group({
      subcriterio: ['', Validators.required],
      valoracion: ['', Validators.required],
      detalle: ['', Validators.required],
      orden: ['', Validators.required],
      tipo: ['', Validators.required],
    })
  }

  ngOnInit(): void {
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
}
