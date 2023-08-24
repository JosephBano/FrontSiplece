import { Component, OnInit } from '@angular/core';
import { CriteriosService } from 'src/app/services/modeloServicios/criterios.service';
import { Criterio } from '../../../../models/criterio.model';
import { SubCriterio } from '../../../../models/subCriterio.model';
import { SubCriteriosService } from 'src/app/services/modeloServicios/sub-criterios.service';
import { Indicador } from 'src/app/models/indicador.model';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tabla-indicadores',
  templateUrl: './tabla-indicadores.component.html',
  styleUrls: ['./tabla-indicadores.component.css']
})
export class TablaIndicadoresComponent implements OnInit{

  modelo = '1';
  Criterios: Criterio[] = [];
  SubCriterios: SubCriterio[] = [];
  Indicadores: Indicador[] = [];

  ValidatorData: boolean = false;
  
  constructor (
    private criterioService: CriteriosService,
    private scriterioService: SubCriteriosService,
    private indicadorService: IndicadorService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const criterios$ = this.criterioService.getByModelo(this.modelo);
    const subCriterios$ = this.scriterioService.getByModelo(this.modelo);
    const indicadores$ = this.indicadorService.getByModelo(this.modelo);

    forkJoin([criterios$, subCriterios$, indicadores$]).subscribe(
      ([criteriosData, subCriteriosData, indicadoresData]) => {
        this.Criterios = criteriosData;
        this.SubCriterios = subCriteriosData;
        this.Indicadores = indicadoresData;
        this.HandlerData();
      },
      (error) => {
        //error
      }
    );
  }

  HandlerData(){
    
  }

  HandlerValidatorData(){
    if(this.Indicadores && this.SubCriterios && this.Criterios) this.ValidatorData = true; 
  }

  // <=== Aqui Acaban las tres funciones


  loadSubCriterios(id: string){
    this.scriterioService.getByCriterio(id).subscribe(
      (data) => {
        data.forEach(element => {
          this.SubCriterios.push(element);
        });;
      }
    )
  }

  loadIndicadores(id: string) {
    this.indicadorService.getBySubCriterio(id).subscribe(
      (data) => {
        data.forEach( element => {
          this.Indicadores.push(element);
        })
      }
    )
  }

}