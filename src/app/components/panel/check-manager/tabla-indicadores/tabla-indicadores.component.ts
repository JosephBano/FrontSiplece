import { Component, OnInit } from '@angular/core';
import { CriteriosService } from 'src/app/services/modeloServicios/criterios.service';
import { Criterio } from '../../../../models/modelos-generales/criterio.model';
import { SubCriterio } from '../../../../models/modelos-generales/subCriterio.model';
import { SubCriteriosService } from 'src/app/services/modeloServicios/sub-criterios.service';
import { Indicador } from 'src/app/models/modelos-generales/indicador.model';
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
  SelectedSubCriterios: boolean[][] = [];
  
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
        this.HandlerValidatorData();
      },
      (error) => {
        //error
      }
    );
  }

  HandlerValidatorData(){
    if(this.Indicadores && this.SubCriterios && this.Criterios) this.ValidatorData = true; 
  }

  toggleIndicator(i: number, y: number): void {
    if (!this.SelectedSubCriterios[i]) {
      this.SelectedSubCriterios[i] = [];
    }
    this.SelectedSubCriterios[i][y] = !this.SelectedSubCriterios[i][y];
  }
}