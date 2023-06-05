import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  //Observable string sources

  private institucionSelectedSource = new BehaviorSubject<string | null>(null);
  private modeloSelectedSource = new BehaviorSubject<string | null>(null);
  private criterioSelectedSource = new BehaviorSubject<string | null>(null);
  private subCriterioSelectedSource = new BehaviorSubject<string | null>(null);

  private refreshRequestedSource = new Subject<void>();

  //Observable string streams

  institucionSelected$ = this.institucionSelectedSource.asObservable();
  modeloSelected$ = this.modeloSelectedSource.asObservable();
  criterioSelected$ = this.criterioSelectedSource.asObservable();
  subCriterioSelected$ = this.subCriterioSelectedSource.asObservable();

  refreshRequested$ = this.refreshRequestedSource.asObservable();

  //Comandos de mensajes servicio 

  selectInstitucion(id: string | null) {
    this.institucionSelectedSource.next(id);
    if(!id) {
      this.selectModelo(null);
    }
  }
  selectModelo(id: string | null) {
    this.modeloSelectedSource.next(id);
    if(!id) {
      this.selectCriterio(null);
    }
  }
  selectCriterio(id: string | null) {
    this.criterioSelectedSource.next(id);
    if(!id) {
      this.selectSubCriterio(null)
    }
  }
  
  selectSubCriterio(id: string | null) {
    this.subCriterioSelectedSource.next(id);
  }


  requestRefresh() {
    this.refreshRequestedSource.next();
  }
}
