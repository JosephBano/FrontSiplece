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
  private indicadorSelectedSource = new BehaviorSubject<string | null>(null);

  //
  private refreshRequestedInstitucion = new Subject<void>();
  private refreshRequestedModelo = new Subject<void>();
  private refreshRequestedCriterio = new Subject<void>();
  private refreshRequestedSubCriterio = new Subject<void>();          
  private refreshRequestedIndicador = new Subject<void>();          
  
  //Observable string streams

  institucionSelected$ = this.institucionSelectedSource.asObservable();
  modeloSelected$ = this.modeloSelectedSource.asObservable();
  criterioSelected$ = this.criterioSelectedSource.asObservable();
  subCriterioSelected$ = this.subCriterioSelectedSource.asObservable();
  indicadorSelected$ = this.indicadorSelectedSource.asObservable();
  
  //
  refreshRequestedInstitucion$ = this.refreshRequestedInstitucion.asObservable();
  refreshRequestedModelo$ = this.refreshRequestedModelo.asObservable();
  refreshRequestedCriterio$ = this.refreshRequestedCriterio.asObservable();
  refreshRequestedSubCriterio$ = this.refreshRequestedSubCriterio.asObservable();
  refreshRequestedIndicador$ = this.refreshRequestedIndicador.asObservable();
  
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
    if(!id) {
      this.selectIndicador(null);
    }
  }

  selectIndicador(id: string | null) {
    this.indicadorSelectedSource.next(id);
  }

  // refreshers
  requesRefreshInstitucion(){
    this.refreshRequestedModelo.next();
  }

  requestRefreshModelo() {
    this.refreshRequestedModelo.next();
  }
  
  requestRefreshCriterio() {
    this.refreshRequestedCriterio.next();
  }
  
  requestRefreshSubCriterio() {
    this.refreshRequestedSubCriterio.next();
  }
  
  requestRefreshIndicador() {
    this.refreshRequestedIndicador.next();
  }
}
