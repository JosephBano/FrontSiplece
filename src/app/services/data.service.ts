import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private objStore: {institucion: string, modelo: string, criterio: string, subCriterio: string} = {institucion: "0", modelo: "0", criterio: "0", subCriterio: "0"};
  private objSubject: BehaviorSubject<{institucion: string, modelo: string, criterio: string, subCriterio: string}> = new BehaviorSubject(this.objStore);
  
  private identificador: string = '';
  private identificadorSubject: BehaviorSubject<string> = new BehaviorSubject(this.identificador);

  setIdentificator(data: string) {
    this.identificador = data;
    this.identificadorSubject.next(this.identificador);
  }

  setObj(data: string, identificador: number) {
    switch(identificador) {
      case 1: 
        this.objStore.institucion = data;
        break;
      case 2:
        this.objStore.modelo = data;
        break;
      case 3:
        this.objStore.criterio = data;
        break;
      case 4: 
        this.objStore.subCriterio = data;
        break;
    }

    this.objSubject.next(this.objStore);
  }

  getObj() {
    return this.objSubject.asObservable();
  }

  getIdentificator() {
    return this.identificadorSubject.asObservable();
  }

}
