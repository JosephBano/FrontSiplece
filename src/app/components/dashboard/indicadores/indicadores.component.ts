import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Indicador } from 'src/app/models/indicador.model';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { UpdateService } from 'src/app/services/update-service.service';
import { NgSelectOption } from '@angular/forms';
import { SubCriterio } from '../../../models/subCriterios.model';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {
  
  indicadores: Indicador[] = [];
  subCriterioId!: string| null;
  indicadorSelected!: Indicador[];

  myComponentId = 'indicador';

  constructor(private indicadorService: IndicadorService, private updateservice: UpdateService) { }

  ngOnInit(): void {
    this.updateservice.subCriterioSelected$.pipe(
      switchMap(id => {
        this.subCriterioId = id;
        if (id) {
          return this.indicadorService.getIndicadores(id);
        } else {
          return of([]);
        }
      })
    ).subscribe((data) => {
      this.indicadores = data;
    });
  }
 
  
}
