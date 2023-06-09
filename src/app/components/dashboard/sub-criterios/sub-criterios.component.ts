import { Component, OnInit } from '@angular/core';
import { SubCriterio } from '../../../models/subCriterios.model';
import { SubCriteriosService } from 'src/app/services/modeloServicios/sub-criterios.service';
import { FormControl } from '@angular/forms';
import { UpdateService } from 'src/app/services/update-service.service';
import { of, switchMap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sub-criterios',
  templateUrl: './sub-criterios.component.html',
  styleUrls: ['./sub-criterios.component.css']
})
export class SubCriteriosComponent implements OnInit {
  subCriterios: SubCriterio[] = [];
  subCriterioControl = new FormControl({value: '', disabled: true});
  criterioId!: string | null;

  constructor(private subCriteriosService: SubCriteriosService, private updateService: UpdateService, private ds: DataService) {}

  ngOnInit() {
    this.actualizarCriteriosDelModeloSeleccionado();
    this.actualizarCriterioSeleccionado();
    this.agregarIdentificadorDS();
    this.HandlerRefresh();
  }

  actualizarCriteriosDelModeloSeleccionado() {
    this.updateService.subCriterioSelected$.pipe(
      switchMap(id => {
        this.criterioId = id;
        this.subCriterioControl.reset({value: '', disabled: true});
        if (id) {
          this.subCriterioControl.enable();
          return this.subCriteriosService.getSubCriterio();
        } else {
          return of([]);
        }
      })
    ).subscribe((data) => {
      this.subCriterios = data;
    });
  }
  
  actualizarCriterioSeleccionado() {
    this.subCriterioControl.valueChanges.subscribe((value) => {
      this.updateService.selectSubCriterio(value || null);
    });
  }
  
  HandlerRefresh() {
    this.updateService.refreshRequestedSubCriterio$.subscribe(() => {
      this.actualizarCriteriosDelModeloSeleccionado();
      this.actualizarCriterioSeleccionado();
    })
  }
  
  agregarIdentificadorDS() {
    this.subCriterioControl.valueChanges.subscribe((value) => {
      this.ds.setObj(value?.toString() ?? "0", 4);
    });
  }
}