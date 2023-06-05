import { Component, OnInit } from '@angular/core';
import { ModeloService } from 'src/app/services/modeloServicios/modelo.service';
import { FormControl } from '@angular/forms';
import { UpdateService } from 'src/app/services/update-service.service';
import { switchMap, of } from 'rxjs';
import { Modelo } from 'src/app/models/modelo.model';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements OnInit{
  
  modelos: Modelo[] = [];
  modeloControl = new FormControl({ value: '', disabled: true });
  institucionId!: string | null;
  

  myComponentId = 'modelo';

  constructor(private modelosService: ModeloService, private updateService: UpdateService, private ds: DataService) {}

  ngOnInit() {
    this.actualizarModelosDeInstitucionSeleccionada();
    this.actualizarModeloSeleccionado();
    this.agregarIdentificadorDS();
    this.HandlerRefresh();
  }

  actualizarModelosDeInstitucionSeleccionada() {
    this.updateService.institucionSelected$.pipe(
      switchMap(id => {
        this.institucionId = id;
        this.modeloControl.reset({ value: '', disabled: true });
        if (id) {
          this.modeloControl.enable();
          return this.modelosService.getModelos(id);
        } else {
          return of([]);
        }
      })
    ).subscribe((data) => {
      this.modelos = data;
    });
    console.log("hola");
    
  }

  actualizarModeloSeleccionado() {
    this.modeloControl.valueChanges.subscribe((value) => {
      this.updateService.selectModelo(value || null); 
    });
  }

  HandlerRefresh() {
    this.updateService.refreshRequested$.subscribe(() => {
      this.actualizarModelosDeInstitucionSeleccionada();
      this.actualizarModeloSeleccionado();
    })
  }
  
  agregarIdentificadorDS() {
    this.modeloControl.valueChanges.subscribe((value) => {
      this.ds.setObj({institucion: "0", modelo: value?.toString() ?? "0", criterio: "0", subCriterio: "0"})
    });
  }
}