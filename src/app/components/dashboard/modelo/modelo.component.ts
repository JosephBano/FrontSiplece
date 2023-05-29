import { Component, OnInit } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';
import { FormControl } from '@angular/forms';
import { UpdateService } from 'src/app/services/update-service.service';
import { switchMap, of } from 'rxjs';
import { Modelo } from 'src/app/models/modelo.model';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements OnInit{
  
  modelos: Modelo[] = [];
  modeloControl = new FormControl({ value: '', disabled: true });
  institucionId!: string;

  constructor(private modelosService: ModeloService, private updateService: UpdateService) {}

  ngOnInit() {
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

    this.modeloControl.valueChanges.subscribe((value) => {
      const selectedModelo = value || '';
      this.updateService.selectModelo(selectedModelo);
    });
  }
}
