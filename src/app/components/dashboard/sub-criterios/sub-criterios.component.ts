import { Component, OnInit } from '@angular/core';
import { SubCriterio } from '../../../models/subCriterios.model';
import { SubCriteriosService } from 'src/app/services/sub-criterios.service';
import { FormControl } from '@angular/forms';
import { UpdateService } from '../../../services/update-service.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-sub-criterios',
  templateUrl: './sub-criterios.component.html',
  styleUrls: ['./sub-criterios.component.css']
})
export class SubCriteriosComponent implements OnInit{
  
  subCriterios: SubCriterio[] = [];
  subCriterioControl = new FormControl({value: '', disabled: true});
  criterioId!: string;
  
  constructor(private subCriterioService: SubCriteriosService, private updateService: UpdateService) { }

  ngOnInit() {
    this.updateService.criterioSelected$.pipe(
      switchMap(id => {
        this.criterioId = id;
        this.subCriterioControl.reset({value: '', disabled: true});
        if (id) {
          this.subCriterioControl.enable();
          return this.subCriterioService.getSubCriterio(id);
        } else {
          return of([]);
        }
      })
    ).subscribe((data) => {
      this.subCriterios = data;
    });

    this.subCriterioControl.valueChanges.subscribe(value => {
      const selectedSubCriterio = value || '';
      this.updateService.selectModelo(selectedSubCriterio);
    })
  }
}
