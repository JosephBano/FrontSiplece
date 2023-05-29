import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  //Observable string sources

  private institucionSelectedSource = new Subject<string>();
  private modeloSelectedSource = new Subject<string>();
  private criterioSelectedSource = new Subject<string>();
  private subCriterioSelectedSource = new Subject<string>();

  //Observable string streams

  institucionSelected$ = this.institucionSelectedSource.asObservable();
  modeloSelected$ = this.modeloSelectedSource.asObservable();
  criterioSelected$ = this.criterioSelectedSource.asObservable();
  subCriterioSelected$ = this.subCriterioSelectedSource.asObservable();

  //Comandos de mensajes servicio 

  selectInstitucion(id: string) {
    this.institucionSelectedSource.next(id);
  }
  selectModelo(id: string) {
    this.modeloSelectedSource.next(id);
  }
  selectCriterio(id: string) {
    this.criterioSelectedSource.next(id);
  }
  selectSubCriterio(id: string) {
    this.subCriterioSelectedSource.next(id);
  }
}
