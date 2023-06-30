import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { Indicador } from '../models/indicador.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private objStore: Indicador = {
    IdIndicador: '',
    IdSubcriterio: '',
    IdTipoEvaluacion: '',
    IdIndicadorValoracion: '',
    Detalle: '',
    Orden: '',
    Activo: '',
    valoracion: '',
  };

  private objSubject: BehaviorSubject<Indicador> = new BehaviorSubject(this.objStore);

  setObj(data: Indicador) {
    this.objStore = data
    this.objSubject.next(this.objStore);
  }

  getObj() {
    return this.objSubject.asObservable();
  }
}
