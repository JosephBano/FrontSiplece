import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  private filtroDefault: BehaviorSubject<string> = new BehaviorSubject<string>('0');
  private filtroCriterio: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private filtroSubCriterio: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private filtroIndicador: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private filtroElemento: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private filtroEvidencia: BehaviorSubject<string> = new BehaviorSubject<string>('');
 
  constructor() { }

  getFiltro(tipo: string): Observable<string> {
    switch(tipo) {
      case 'criterio':
        return this.filtroCriterio.asObservable();
      case 'subcriterio':
        return this.filtroSubCriterio.asObservable();
      case 'indicador':
        return this.filtroIndicador.asObservable();
      case 'elemento':
        return this.filtroElemento.asObservable();
      case 'evidencia':
        return this.filtroEvidencia.asObservable();
      default:
        return this.filtroDefault.asObservable();  
    }
  }

  actualizarFiltro(tipo:string, filtro: string):void {
    const value = filtro ?? '';

    switch(tipo) {
      case 'criterio':
        this.filtroCriterio.next(value);
        break;
      case 'subcriterio':
        this.filtroSubCriterio.next(value);
        break;
      case 'indicador':
        this.filtroIndicador.next(value);
        break;
      case 'elemento':
        this.filtroElemento.next(value);
        break;
      case 'evidencia':
        this.filtroEvidencia.next(value);
        break;
    }
  }

  actualizarFiltroDefault(tipo:string):void {
    switch(tipo) {
      case 'criterio':
        this.filtroSubCriterio.next('0');
        this.filtroIndicador.next('0');
        this.filtroElemento.next('0');
        this.filtroEvidencia.next('0');
        break;
      case 'subcriterio':
        this.filtroCriterio.next('0');
        this.filtroIndicador.next('0');
        this.filtroElemento.next('0');
        this.filtroEvidencia.next('0');
        break;
      case 'indicador':
        this.filtroCriterio.next('0');
        this.filtroSubCriterio.next('0');
        this.filtroElemento.next('0');
        this.filtroEvidencia.next('0');
        break;
      case 'elemento':
        this.filtroCriterio.next('0');
        this.filtroSubCriterio.next('0');
        this.filtroIndicador.next('0');
        this.filtroEvidencia.next('0');
        break;
      case 'evidencia':
        this.filtroCriterio.next('0');
        this.filtroSubCriterio.next('0');
        this.filtroIndicador.next('0');
        this.filtroElemento.next('0');
        break;
    }
  }
}
