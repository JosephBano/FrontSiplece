import { Component, OnInit } from '@angular/core';
import { ModeloService } from 'src/app/services/modeloServicios/modelo.service';
import { FormControl } from '@angular/forms';
import { UpdateService } from 'src/app/services/update-service.service';
import { switchMap, of, distinctUntilChanged } from 'rxjs';
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
  
  constructor(private modelosService: ModeloService, private updateService: UpdateService, private ds: DataService) {}

  ngOnInit() {
    this.actualizarModelosDeInstitucionSeleccionada();
    this.actualizarModeloSeleccionado();
    this.agregarIdentificadorDS();
  }

  actualizarModelosDeInstitucionSeleccionada() {
    this.updateService.institucionSelected$.pipe(
      switchMap(id => {
        this.institucionId = id;
        this.modeloControl.reset({ value: '', disabled: true });
        if (id) {
          this.modeloControl.enable(); 
          return this.modelosService.getModelos();
        } else {
          return of([]);
        }
      })
    ).subscribe((data) => {
      this.modelos = data;
    });
  }

  actualizarModeloSeleccionado() {
    this.modeloControl.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value) => {
      this.updateService.selectModelo(value || null); 
    });
  }
  
  agregarIdentificadorDS() {
    this.modeloControl.valueChanges.subscribe((value) => {
      this.ds.setObj(value?.toString() ?? "0", 2);
    });
  }
}