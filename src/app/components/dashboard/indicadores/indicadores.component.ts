import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, of, switchMap } from 'rxjs';
import { Indicador } from 'src/app/models/indicador.model';
import { IndicadorService } from 'src/app/services/modeloServicios/indicador.service';
import { UpdateService } from 'src/app/services/update-service.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {
  indicadores: Indicador[] = [];
  indicadorControl = new FormControl({value: '', disabled: true});
  subCriterioId!: string | null;

  constructor(private indicadorService: IndicadorService, private updateService: UpdateService, private ds: DataService) { }

  ngOnInit() {
    this.actualizarIndicadorDeSubCriterioSeleccionada();
    this.actualizarIndicadorSeleccionado();
    this.agregarIdentificadorDS();
  }

  actualizarIndicadorDeSubCriterioSeleccionada() {
    this.updateService.subCriterioSelected$.pipe(
      switchMap(id => {
        this.subCriterioId = id;
        this.indicadorControl.reset({value: '', disabled: true});
        if (id) {
          this.indicadorControl.enable();
          return this.indicadorService.getIndicador();
        } else {
          return of([]);
        }
      })
    ).subscribe((data) => {
      this.indicadores = data;
    });
  }

  actualizarIndicadorSeleccionado(){
    this.indicadorControl.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value) => {
      this.updateService.selectIndicador(value || null);
    });
  }

  agregarIdentificadorDS() {
    this.indicadorControl.valueChanges.subscribe((value) => {
      this.ds.setObj(value?.toString() ?? "0", 5)
    });
  }
}