import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { Indicador } from 'src/app/models/indicador.model';
import { IndicadorService } from 'src/app/services/indicador.service';
import { UpdateService } from 'src/app/services/update-service.service';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  indicadores: Indicador[] = [];
  indicadorControl = new FormControl({value: '', disabled: true});
  subCriterioId!: string;

  constructor( private indicadorService: IndicadorService, private updateService: UpdateService) { }

  ngOnInit(): void {
    this.updateService.subCriterioSelected$.pipe(
      switchMap(id => {
        this.subCriterioId = id;
        this.indicadorControl.reset({value: '', disabled: true});
        if (id) {
          this.indicadorControl.enable();
          return this.indicadorService.getIndicadores(id);
        } else {
          return of([]);
        }
      })
    ).subscribe( data => {
      this.indicadores = data;
    })
  }
}
