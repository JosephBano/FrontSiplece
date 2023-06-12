import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, of, switchMap } from 'rxjs';
import { Criterio } from 'src/app/models/criterios.model';
import { DataService } from 'src/app/services/data.service';
import { CriteriosService } from 'src/app/services/modeloServicios/criterios.service';
import { UpdateService } from 'src/app/services/update-service.service';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent implements OnInit {
  criterios: Criterio[] = [];
  criterioControl = new FormControl({value: '', disabled: true});
  modeloId!: string | null;

  constructor(private criteriosService: CriteriosService, private updateService: UpdateService, private ds: DataService) { }

  ngOnInit() {
    this.actualizarCriteriosDeModeloSeleccionada();
    this.actualizarCriterioSeleccionado();
    this.agregarIdentificadorDS();
  }

  actualizarCriteriosDeModeloSeleccionada() {
    this.updateService.modeloSelected$.pipe(
      switchMap(id => {
        this.modeloId = id;
        this.criterioControl.reset({value: '', disabled: true});
        if (id) {
          this.criterioControl.enable();
          return this.criteriosService.getCriterios();
        } else {
          return of([]);
        }
      })
    ).subscribe((data) => {
      this.criterios = data;
    });
  }

  actualizarCriterioSeleccionado(){
    this.criterioControl.valueChanges.pipe(
        distinctUntilChanged()
    ).subscribe((value) => {
        this.updateService.selectCriterio(value || null);
    });
}


  agregarIdentificadorDS() {
    this.criterioControl.valueChanges.subscribe((value) => {
      this.ds.setObj(value?.toString() ?? "0", 3)
    });
  }
}