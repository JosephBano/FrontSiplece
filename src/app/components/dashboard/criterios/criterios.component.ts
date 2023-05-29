import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { Criterio } from 'src/app/models/criterios.model';
import { CriteriosService } from 'src/app/services/criterios.service';
import { UpdateService } from 'src/app/services/update-service.service';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent implements OnInit {
  criterios: Criterio[] = [];
  criterioControl = new FormControl({value: '', disabled: true});
  modeloId!: string;

  constructor(private criteriosService: CriteriosService, private updateService: UpdateService) { }

  ngOnInit() {
    this.updateService.modeloSelected$.pipe(
      switchMap(id => {
        this.modeloId = id;
        this.criterioControl.reset({value: '', disabled: true});
        if (id) {
          this.criterioControl.enable();
          return this.criteriosService.getCriterios(id);
        } else {
          return of([]);
        }
      })
    ).subscribe((data) => {
      this.criterios = data;
    });

    this.criterioControl.valueChanges.subscribe((value) => {
      const selectedCriterio = value || '';
      this.updateService.selectCriterio(selectedCriterio);
    })
  }
}
