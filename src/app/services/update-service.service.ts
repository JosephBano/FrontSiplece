import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private updatingLowerLevelEntity = false;

  //Observable string sources

  private institucionSelectedSource = new BehaviorSubject<string | null>(null);
  private modeloSelectedSource = new BehaviorSubject<string | null>(null);
  private criterioSelectedSource = new BehaviorSubject<string | null>(null);
  private subCriterioSelectedSource = new BehaviorSubject<string | null>(null);
  private indicadorSelectedSource = new BehaviorSubject<string | null>(null);     
  
  //Observable string streams

  institucionSelected$ = this.institucionSelectedSource.asObservable();
  modeloSelected$ = this.modeloSelectedSource.asObservable();
  criterioSelected$ = this.criterioSelectedSource.asObservable();
  subCriterioSelected$ = this.subCriterioSelectedSource.asObservable();
  indicadorSelected$ = this.indicadorSelectedSource.asObservable();
  
  //Comandos de mensajes servicio 

  selectInstitucion(id: string | null) {
    this.institucionSelectedSource.next(id);
    if(!id && !this.updatingLowerLevelEntity) {
      this.selectModelo(null);
    }
  }
  selectModelo(id: string | null) {
    this.modeloSelectedSource.next(id);
    if(!id && !this.updatingLowerLevelEntity) {
      this.selectCriterio(null);
    }
  }
  selectCriterio(id: string | null) {
    this.criterioSelectedSource.next(id);
    if(!id && !this.updatingLowerLevelEntity) {
      this.selectSubCriterio(null)
    }
  }
  
  selectSubCriterio(id: string | null) {
    this.updatingLowerLevelEntity = true;
    this.subCriterioSelectedSource.next(id);
    if(!id) {
      this.selectIndicador(null);
    }
    this.updatingLowerLevelEntity = false;
  }

  selectIndicador(id: string | null) {
    this.updatingLowerLevelEntity = true;
    this.indicadorSelectedSource.next(id);
    this.updatingLowerLevelEntity = false;
  }
}
